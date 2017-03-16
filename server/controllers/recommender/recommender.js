var pool = require(appRoot + '/controllers/database/database.js').pool;

function sendError(res, errorCode, errorMst) {
	var json = {"success" : "false", "error_code" : errorCode, "errorMst" : errorMst};
	res.status(errorCode).send(json);
}

function sendData(res, data) {
	var json = {"success" : "true", "data" : data};
	res.send(json);
}

/* Sorting function by Gerald Fullam, taken from Stack Overflow

*/
function sortByElement(path, reverse, primer, then) {
    var get = function (obj, path) {
            if (path) {
                path = path.split('.');
                for (var i = 0, len = path.length - 1; i < len; i++) {
                    obj = obj[path[i]];
                };
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
            (A > B) ?  1 :
            (typeof then === 'function') ? then(a, b) : 0
        ) * [1,-1][+!!reverse];
    };
}

exports.recommendGET = function(args, res, next) {
    var body = args.body;
    //limit is body.limit, course is body.course
    var query = 'SELECT * FROM applicants';
    pool.query(query, function(err, result) {
      if (err) {
        sendError(res, 400, err);
      }
      else if (!result.rows.length) {
        sendError(res, 404, "No applicants");
      }
      else {
        var data = result.rows;
        /**
        Rules
        Prioritize graduate over undergraduate applicants. (easily implemented)
        Exhaust list of applicants from the department of Computer science before making offers to applicants from other departments. (easily implemented)
        Prioritize based on how many times an applicant has taught a course in the past. ()
        Applicants give a ranking of courses they would like to TA, prioritize based on each applicant’s preferences. (currently not keeping track of order of preferences: is applied_courses an ordered list?)
        Consider that each graduate has to be made at least one offer. (no offer grads > offered grads)
        Consider that you need to match previous hours of Phd applicants. (currently not tracked: probaby don't bother implementing)
        If given enough time, a rating system where professors can rate the performance of TAs. Highest rating recommended first.
        */
        //Add a ranking to each row (entry), set at max
				for (var i = 0; i < data.length; i++) {
    			var object = data[i];
					var ranking = 100;
					//Deduct ranking score based on filter rules

					object.ranking = ranking;
				}
				data.sort(sortByElement('ranking', true, parseInt, null));

				//Slice list down to given size
				data.slice(0, body.limit);

				sendData(res, data);
      }
    });

  /**
   * returns a list of recommended applicants for a given course
   *
   * session String session token to identify the user and ensure permissable access
   * course Applicant course to recommend for
   * limit Integer limits the number of recommendations (optional)
   * returns List
   **/
  var examples = {};
  examples['application/json'] = [ {
  "offers" : [ {
    "hours" : 123,
    "approved" : true,
    "o_id" : 123,
    "course" : "",
    "accepted" : true,
    "applicant" : ""
  } ],
  "courses" : [ 123 ],
  "year" : 123,
  "work_status_explanation" : "aeiou",
  "program" : "aeiou",
  "given_name" : "aeiou",
  "experience" : "aeiou",
  "applied_courses" : [ "" ],
  "department_explanation" : "aeiou",
  "active_offers" : [ "" ],
  "password" : "aeiou",
  "a_id" : 123,
  "phone" : 123,
  "ta_courses" : [ {
    "desired_applicants" : [ "" ],
    "preference" : "aeiou",
    "tas" : [ "" ],
    "head_instructor" : {
      "i_id" : 123,
      "given_name" : "aeiou",
      "family_name" : "aeiou",
      "email" : "aeiou"
    },
    "flagged_applicants" : [ "" ],
    "avoid_applicants" : [ "" ],
    "additional_instructors" : [ "" ],
    "name" : "aeiou",
    "c_id" : 123,
    "semester" : "aeiou",
    "expected_enrollment" : 123,
    "assigned_applicants" : [ "" ],
    "start_date" : "2000-01-23"
  } ],
  "appy_date" : "aeiou",
  "work_status" : "aeiou",
  "department" : "aeiou",
  "family_name" : "aeiou",
  "email" : "aeiou"
} ];
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}
