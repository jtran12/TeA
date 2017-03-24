var pool = require(appRoot + '/controllers/database/database.js').pool;
var pool2 = require(appRoot + '/controllers/database/database.js').pool;

function sendError(res, errorCode, errorMst) {
  var json = {"success" : "false", "error_code" : errorCode, "errorMst" : errorMst};
  res.status(errorCode).send(json);
}

function sendData(res, data) {
  var json = {"success" : "true", "data" : data};
  res.send(json);
}

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

// TODO: Implement updateTopTen
updateTopTen(course, applicant, offerData){
	/*
	// Compute rank of 'applicant' for 'course'
	
    Prioritize graduate over undergraduate applicants.

    Exhaust list of applicants from the department of Computer science before making offers to applicants from other departments.

    Prioritize based on how many times an applicant has taught a course in the past.

    Applicants give a ranking of courses they would like to TA, prioritize based on each applicant’s preferences.

    Consider that each graduate has to be made at least one offer.

    Consider that you need to match previous hours of Phd applicants.

    If given enough time, a rating system where professors can rate the performance of TAs. Highest rating recommended first.
	
	
	// Update recommended_applicants
	
	
    var applicantQuery = 'SELECT * FROM applicants';
    var offersQuery = 'SELECT * FROM applications';
    var offerData = null;
    args.query.course = args.query.course.toLowerCase();

    pool2.query(offersQuery, function(offErr, offResult) {
        if (offErr) {
            sendError(res, 404, err);
        }
        else if (!offResult.rows.length) {
            offerData = [];
        }
        else {
            offerData = offResult.rows;
        }
    });

    pool.query(applicantQuery, function(err, result) {
        if (err) {
            sendError(res, 400, err);
        }
        else if (!result.rows.length) {
            sendError(res, 404, "No applicants");
        }
        else {
            var data = result.rows;
            // Rank applicants for list, using ruleset
            for (var i = 0; i < data.length; i++) {
                var applicant = data[i];
                var ranking = 100;

                for (var j = 0; j < offerData.length; j++) {
                    var offer = offerData[j];

                    //Make sure applicant not already offered this course.
                    //If they are, remove applicant from dataset.
                    
                    if (!courseCode.length) {
                        sendError(res, 404, "No course to recommend for");
                    }
                    if ((applicant.utorid.toLowerCase() === offer.utorid.toLowerCase()) && (offer.course.toLowerCase() === args.query.course.toLowerCase())) {
                        data.splice(i, 1);
                        applicant = null;
                        i--;
                        break;
                    }
                }
                // If applicant removed from dataset, break 1 iteration of loop
                if (!applicant) {
                    continue;
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
                var course = courseCodeParser(args.query.course);
                lowerCaseArray(applicant.tacourses);
                courseArrayCodeParser(applicant.tacourses);
                if (applicant.tacourses.includes(course[0])) {
                    ranking += 10;
                }

                lowerCaseArray(applicant.courses);
                courseArrayCodeParser(applicant.courses);
                // Give a little bump to applicants who previously took the course
                if (applicant.courses.includes(course[0])) {
                    ranking += 5;
                }

                // Give higher ranking to those who listed the course as a preference
                // What happened to applied_courses?

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

                applicant.ranking = ranking;
            }
            data.sort(sortByElement('ranking', true, parseInt, null));
            // Slice list down to given size
            if (args.query.limit) {
              data = data.slice(0, args.query.limit);
            }
            sendData(res, data);
        }
    }); */
}


exports.updateRecommendations(utorid){
	var applicantQuery = 'SELECT * FROM applicants WHERE utorid=$1';
	var applicant = null;
	pool.query(applicantQuery, [utorid], function(err, result) {
      if (err) {
        sendError(res, 400, err);
      } else if (!result.rows.length) {
          sendError(res, 404, "Applicant with utorid: " + utorid + " not found");
      } else {
          applicant = result.rows[0];
      }
    });

	var offersQuery = 'SELECT * FROM applications WHERE utorid=$1';
	var offerData = null;
    pool.query(offersQuery, [utorid], function(offErr, offResult) {
        if (offErr) {
            sendError(res, 400, err);
        } else if (!offResult.rows.length) {
            offerData = [];
        } else {
            offerData = offResult.rows;
        }
    });
    
    var courseQuery = 'SELECT * FROM course_recommendations';
    pool.query(courseQuery, function(err, result) {
      if (err) {
        sendError(res, 400, err);
      } else if (!result.rows.length) {
          sendError(res, 404, "No courses to recommend");
      } else {
		  var courses = result.rows;
          for (var i = 0; i < courses.length; i++){
		    updateTopTen(courses[i], applicant, offerData);
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
	var courseCode = courseCodeParser(args.query.course); 
	var courseQuery = "SELECT * FROM course_recommendations WHERE coursecode=$1";
	pool.query(courseQuery, [courseCode], function(err, result) {
      if (err) {
        sendError(res, 400, err);
      } else if (!result.rows.length) {
          sendError(res, 404, "No recommendation for course: " + args.query.course);
      } else {
		  // TODO: Remove ranks before return
          sendData(res, result.rows.recommended_applicants);
      }
    });
};
