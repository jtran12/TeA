var sender = require(appRoot + '/controllers/sender.js');
var pool = require(appRoot + '/controllers/database/database.js').pool;
var pool2 = require(appRoot + '/controllers/database/database.js').pool;

function courseCodeParser(course) {
  var regex = /[a-z]+[0-9]+/i;
  var courseCode = regex.exec(course.toLowerCase());

  return courseCode[0];
}

function courseArrayCodeParser(courseArray) {
  for (var i = 0; i < courseArray.length; i++) {
    var course = courseCodeParser(courseArray[i]);
    if (course.length) {
      courseArray[i] = course;
    }
  }
}

function lowerCaseArray(courses) {
  var result = [];
  if (courses) {
    for (var i = 0; i < courses.length; i++) {
      result.push(courses[i].toLowerCase());
    }
  }
  
  return result;
}

function updateTopThirty(course, applicant, offerData) {
    // Compute rank of 'applicant' for 'course'

    var ranking = 100;
    for (var j = 0; j < offerData.length; j++) {
    var offer = offerData[j];

      // Make sure applicant not already offered this course.
      // If they are, do not put them in the recommendation list and return.

      if ((applicant.utorid.toLowerCase() === offer.utorid.toLowerCase()) && (offer.course.toLowerCase() === args.query.course.toLowerCase())) {
        return;
      }
    }

    // Prioritize graduate over undergraduate and phd applicants.
	if (applicant.program.toLowerCase() === "undergrad") {
		ranking -= 15;
	}
	else if (applicant.program.toLowerCase() === "phd") {
		ranking -= 10;
	}
	else if (applicant.program.toLowerCase() === 'masters') {
		ranking += 5;
	}
	else {
		ranking -= 15;
	}

	// Prefer CSC applicants for TAship over non-CSC
	if (applicant.studentdepartment.toLowerCase() !== "csc") {
		ranking -= 20;
	}

	// Prefer applicants who have previously TA'd the course
	var courseCode = courseCodeParser(course.course);
	courseArrayCodeParser(applicant.tacourses);
	if (applicant.tacourses.includes(courseCode[0])) {
		ranking += 10;
	}

	courseArrayCodeParser(applicant.courses);
	// Give a little bump to applicants who previously took the course
	if (applicant.courses.includes(courseCode[0])) {
		ranking += 5;
	}

	// Give higher ranking to those who listed the course as a preference
	if (applicant.appliedcourses.includes(course.course.toLowerCase())) {
		ranking += 5;
	}

	// Reduce priority if masters applicant and already made an offer
	if (offerData && (applicant.program.toLowerCase() === "masters")) {
		for (var j = 0; j < offerData.length; j++) {
			var offer = offerData[j];
			if (applicant.utorid === offer.utorid) {
				ranking -= 5;
				break;
			}
		}
	}


	var recommendationsLength = course.recommended_applicants.length;
	for (var i = 0; i < course.recommended_applicants.length; i++) {
		var currID = course.recommended_applicants[i].split(" ")[0];
		var currRank = course.recommended_applicants[i].split(" ")[1];
		// If utorid already in array, remove it
		if (currID === applicant.utorid) {
			course.recommended_applicants.splice(i, 1);
			i--;
			continue;
		}

		if (ranking > currRank) {
			course.recommended_applicants.splice(i, 0, applicant.utorid + " " + ranking);
			break;
		}
	}

	if ((course.recommended_applicants.length < 30) && (course.recommended_applicants.length === recommendationsLength)) {
		course.recommended_applicants.push(applicant.utorid + " " + ranking);
	}

	course.recommended_applicants.splice(30);

	var query = "UPDATE courses SET recommended_applicants=$1 WHERE course=$2";
	pool.query(query, [course.recommended_applicants, course.course], function(err, result) {
      if (err) {
        sender.sendError(res, 400, err);
      }
      else if (!result.rowCount) {
        sender.sendError(res, 404, "Course not found");
      }
    });
}


exports.updateRecommendations = function(utorid) {
	var applicantQuery = 'SELECT * FROM applicants WHERE utorid=$1';
	var applicant = null;
	pool.query(applicantQuery, [utorid], function(err, result) {
      if (err) {
          sender.sendError(res, 400, err);
      } else if (!result.rows.length) {
          sender.sendError(res, 404, "Applicant with utorid: " + utorid + " not found");
      } else {
          applicant = result.rows[0];
          applicant.utorid = applicant.utorid.toLowerCase();
          applicant.familyname = applicant.familyname.toLowerCase();
          applicant.givenname = applicant.givenname.toLowerCase();
          applicant.program = applicant.program.toLowerCase();
          applicant.email = applicant.email.toLowerCase();
          applicant.studentdepartment = applicant.studentdepartment.toLowerCase();
          applicant.tacourses = lowerCaseArray(applicant.tacourses);
          applicant.courses = lowerCaseArray(applicant.courses);
          applicant.declinedcourses = lowerCaseArray(applicant.declinedcourses);
          applicant.appliedcourses = lowerCaseArray(applicant.appliedcourses);
          applicant.currentassignedcourses = lowerCaseArray(applicant.currentassignedcourses);
      }
    });

	var offersQuery = 'SELECT * FROM applications WHERE utorid=$1';
	var offerData = null;
    pool.query(offersQuery, [utorid], function(offErr, offResult) {
        if (offErr) {
            sender.sendError(res, 400, offErr);
        } else if (!offResult.rows.length) {
            offerData = [];
        } else {
            offerData = offResult.rows;
        }
    });

    var courseQuery = 'SELECT * FROM courses';
    pool.query(courseQuery, function(err, result) {
      if (err) {
        sender.sendError(res, 400, err);
      } else {
        var courses = result.rows;
        for (var i = 0; i < courses.length; i++) {
          updateTopThirty(courses[i], applicant, offerData);
        }
      }
    });
};

/**
 * Returns a list of recommended applicants for a given course
 * INPUT = course id
 * OUTPUT = {list of top 10 most recommended applicants}
 **/
exports.recommendGET = function(args, res, next) {
	var course = args.query.course.toLowerCase();
	var courseQuery = "SELECT * FROM courses WHERE course=$1";
	pool.query(courseQuery, [course], function(err, result) {
      if (err) {
          sender.sendError(res, 400, err);
      } else if (!result.rows.length) {
          sender.sendError(res, 404, "Course: " + args.query.course + " not found");
      } else {
          var topApplicants = [];
          for (var i = 0; i < result.rows[0].recommended_applicants.length; i++) {
            var tokens = result.rows[0].recommended_applicants[i].split(" ");
            topApplicants.push(tokens[0]);
          }
          sender.sendData(res, topApplicants);
      }
    });
};
