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
      courseArray[i] = course[0];
    }
  }
}

function lowerCaseArray(courses) {
  if (courses) {
    for (var i = 0; i < courses.length; i++) {
      courses[i] = courses[i].toLowerCase();
    }
  }
}

// Sorting function by Gerald Fullam, taken from Stack Overflow
function sortByElement(path, reverse, primer, then) {
    var get = function (obj, path) {
            if (path) {
                path = path.split('.');
                for (var i = 0, len = path.length - 1; i < len; i++) {
                    obj = obj[path[i]];
                }

                return obj[path[len]];
            }

            return obj;
        },
        prime = function (obj) {

            return primer ? primer(get(obj, path)) : get(obj, path);
        };

    return function (a, b) {
        var A = prime(a),
            B = prime(b);

        return (
            (A < B) ? -1 :
            (A > B) ? 1 :
            (typeof then === 'function') ? then(a, b) : 0
        ) * [1, -1][+!!reverse];
    };
}

function updateTopThirty(course, applicant, offerData) {
	// Compute rank of 'applicant' for 'course'

    var ranking = 100;

    for (var j = 0; j < offerData.length; j++) {
	  var offer = offerData[j];

      //Make sure applicant not already offered this course.
      //If they are, do not put them in the recommendation list and return.

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
	lowerCaseArray(applicant.tacourses);
	courseArrayCodeParser(applicant.tacourses);
	if (applicant.tacourses.includes(courseCode[0])) {
		ranking += 10;
	}

	lowerCaseArray(applicant.courses);
	courseArrayCodeParser(applicant.courses);
	// Give a little bump to applicants who previously took the course
	if (applicant.courses.includes(courseCode[0])) {
		ranking += 5;
	}

	// Give higher ranking to those who listed the course as a preference
	// What happened to applied_courses?
	if (applicant.applied_courses.includes(course.course.toLowerCase())) {
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
    for (var i = 0; i < recommendationsLength; i++){
		var curr_rank = course.recommended_applicants[i].split(" ")[1];
		if (ranking > curr_rank){
			course.recommended_applicants.splice(i, 0, applicant.utorid + " " + ranking);
			break;
		}
	}
	if ((course.recommended_applicants.length < 30) && (course.recommended_applicants.length == recommendationsLength)){
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
      else {
        res.sendStatus(200);
      }
    });
}


exports.updateRecommendations(utorid){
	var applicantQuery = 'SELECT * FROM applicants WHERE utorid=$1';
	var applicant = null;
	pool.query(applicantQuery, [utorid], function(err, result) {
      if (err) {
          sender.sendError(res, 400, err);
      } else if (!result.rows.length) {
          sender.sendError(res, 404, "Applicant with utorid: " + utorid + " not found");
      } else {
          applicant = result.rows[0];
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
        for (var i = 0; i < courses.length; i++){
		      updateTopThirty(courses[i], applicant, offerData);
		    }
      }
    });
}

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
		  // TODO: Remove ranks before return
          sender.sendData(res, result.rows[0].recommended_applicants);
      }
    });
};
