var pool = require(appRoot + '/controllers/database/database.js').pool;

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
  var coursecode = course.exec(regex);
  return coursecode;
}

function lowerCaseArray(courses) {
  for (var i = 0; i < courses.length; i++) {
    courses[i] = courses[i].toLowerCase();
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

/**
 * Returns a list of recommended applicants for a given course
 *
 * session String session token to identify the user and ensure permissable access
 * course Applicant course to recommend for
 * limit Integer limits the number of recommendations (optional)
 * returns List
 **/
exports.recommendGET = function(args, res, next) {
    var body = args.body;
    var applicantQuery = 'SELECT * FROM applicants';
    var offersQuery = 'SELECT * FROM applications';

    pool.query(applicantQuery, function(err, result) {
        if (err) {
            sendError(res, 400, err);
        }
        else if (!result.rows.length) {
            sendError(res, 404, "No applicants");
        }
        else {
            var offerData = null;
            pool.query(offersQuery, function(offErr, offResult) {
                if (offErr) {
                    sendError(res, 400, err);
                }
                else {
                    offerData = offResult.rows;
                }
            });
            var data = result.rows;
            // Rank applicants for list, using ruleset
            for (var i = 0; i < data.length; i++) {
                var applicant = data[i];
                var ranking = 100;

                for (var j = 0; j < offerData.length; j++) {
                    var offer = offerData[j];

                    /* Make sure applicant not already offered this course.
                       If they are, remove applicant from dataset.
                    */
                    courseCode = courseCodeParser(offer.course);
                    if (!courseCode.length) {
                        sendError(res, 404, "No course to recommend for");
                    }
                    if ((applicant.utorid === offer.utorid) && (courseCode[0] === args.query.course)) {
                        data.remove(applicant);
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
                else if (applicant.program.toLowerCase() !== 'masters') {
                    ranking -= 15;
                }

                // Prefer CSC applicants for TAship over non-CSC
                if (applicant.department.toLowerCase() !== "csc") {
                    ranking -= 20;
                }

                // Prefer applicants who have previously TA'd the course
                var taCourses = lowerCaseArray(applicant.ta_courses);
                if (taCourses.toLowerCase().includes(args.query.course.toLowerCase())) {
                    ranking += 30;
                }

                var coursesTaken = lowerCaseArray(applicant.courses);
                // Give a little bump to applicants who previously took the course
                if (coursesTaken.includes(args.query.course.toLowerCase())) {
                    ranking += 5;
                }

                // Give higher ranking to those who listed the course as a preference
                // What happened to applied_courses?

                // Reduce priority if masters applicant and already made an offer
                if ((applicant.program.toLowerCase() === "masters")) {
                    for (var j = 0; j < offerData.length; j++) {
                        var offer = offerData[j];
                        if (applicant.utorid === offer.utorid) {
                            ranking -= 10;
                            break;
                        }
                    }
                }

                applicant.ranking = ranking;
            }
            data.sort(sortByElement('ranking', true, parseInt, null));
            // Consider deleting ranking score (probably not necessary)
            // Slice list down to given size
            if (args.query.limit) {
              data.slice(0, args.query.limit);
            }
            sendData(res, data);
        }
    });
};
