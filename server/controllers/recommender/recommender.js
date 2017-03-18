var pool = require(appRoot + '/controllers/database/database.js').pool;

function sendError(res, errorCode, errorMst) {
  var json = {"success" : "false", "error_code" : errorCode, "errorMst" : errorMst};
  res.status(errorCode).send(json);
}

function sendData(res, data) {
  var json = {"success" : "true", "data" : data};
  res.send(json);
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
                    if ((applicant.utorid === offer.applicant.utorid) && (offer.course.c_id === body.course.c_id)) {
                        data.remove(applicant);
                        i--;
                        break;
                    }
                }

                // Prioritize graduate over undergraduate and phd applicants.
                if (applicant.program.toLowerCase() === "undergrad") {
                    ranking -= 10;
                }
                else if (applicant.program.toLowerCase() === "phd") {
                    ranking -= 5;
                }

                // Prefer CSC applicants for TAship over non-CSC
                if (applicant.department.toLowerCase() !== "csc") {
                    ranking -= 20;
                }

                // Prefer applicants who have previously TA'd the course
                if (applicant.ta_courses.toLowerCase().includes(body.course.name.toLowerCase())) {
                    ranking += 30;
                }

                // Give higher ranking to those who listed the course as a preference
                // What happened to applied_courses?

                // Reduce priority if masters applicant and already made an offer
                if ((applicant.program.toLowerCase() === "masters")) {
                    for (var j = 0; j < offerData.length; j++) {
                        var offer = offerData[j];
                        if (applicant.utorid === offer.applicant.utorid) {
                            ranking -= 10;
                            break;
                        }
                    }
                }

                // Consider that you need to match previous hours of Phd applicants.

                applicant.ranking = ranking;
            }
            data.sort(sortByElement('ranking', true, parseInt, null));
            // Consider deleting ranking score (probably not necessary)
            // Slice list down to given size
            if (body.limit) {
              data.slice(0, body.limit);
            }
            sendData(res, data);
        }
    });
};
