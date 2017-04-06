var sender = require(appRoot + '/controllers/sender.js');
var pool = require(appRoot + '/controllers/database/database.js').pool;
var applicant = require(appRoot + '/controllers/applicant/applicant.js');

function genCourse(query) {
    // Generates the course code

    if (query.coursecode && query.term && query.year) {
        return query.coursecode + query.term + query.year;
    }

    return null;
}

function courseParser(req) {
  var query = req.query;

  if (query.id) {
    return query.id;
  }

  return genCourse(query);
}

exports.updateAssignedCourse = function(utorid, prevCourse, course, res) {
  // Note: the following routes use the given inputs:
  //    PUT, prev_course = course, course = course
  //    POST, prev_course = NULL, course = course
  //    DELETE, prev_course = course, course = NULL
  // Helper function for changing assigned course of applicants

  var query = "SELECT * FROM applicants where utorid=$1";

  pool.query(query, [utorid], function(err, result) {
      if (err) {
        sender.sendError(res, 400, err);
      }
      else if (!result.rowCount) {
        sender.sendError(res, 404, "Applicant not found.");
      }
      else {
          console.log(result.rows[0]);
          console.log(result.rows[0].utorid);
          var courses = result.rows[0].currentAssignedCourses || [];
          console.log(courses);

          if (prevCourse === null && course !== null) {
            console.log("POST. Adding a course to currentAssignedCourses");
            courses.push(course);
          }
          else if (prevCourse !== null && course !== null) {
            console.log("PUT. Editing a course in currentAssignedCourses");
            var index = courses.indexof(prevCourse);
            if (index !== -1) {
                courses[index] = course;
            } else {
                sender.sendError(res, 404, "The previous course for applicant is not found");
            }
          }
          else if (prevCourse !== null && course === null) {
            console.log("DELETE. Deleting a course.");
            var index = courses.indexof(course);
            if (index !== -1) {
                courses.splice(index, 1);
            } else {
                sender.sendError(res, 404, "The previous course for applicant isn't found")
            }
          } else {
            sender.sendError(res, 400, "Course was not updated for applicant.");
          }

          query = "UPDATE applicants SET currentAssignedCourses=$2 where utorid=$1";

          pool.query(query, [utorid, courses], function(err, result) {
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
  });
};


// Individual Offers

exports.postOffer = function(req, res) {

    var body = req.body;
    var course = genCourse(body);

    if (!course) {
        sender.sendError(res, 400, "Missing course fields");
    } else if (!body.utorid) {
        sender.sendError(res, 400, "Missing utorid of TA who's being offered");
    } else {
        // Check if offer exists already
        var query = "SELECT * FROM applications WHERE utorid=$1 AND course=$2";

    pool.query(query, [body.utorid, course], function(err, result) {
      if (err) {
        sender.sendError(res, 404, err);
      }
      else if (!result.rows.length) {
          // Make new entry

          query = "INSERT INTO applications VALUES($1, $2, $3, $4)";

          pool.query(query, [body.utorid, course, "true", "false"], function(err, result) {
              if (err) {
                  sender.sendError(res, 400, err);
              }
              else {
                  // Update applicant's currentAssignedCourses
                  exports.updateAssignedCourse(body.utorid, null, course, res);
              }
          });
      }
      else {
        sender.sendError(res, 400, "The offer already exists.");
      }
    });

    }
};

exports.getOffer = function(req, res) {

    var utorid = req.query.utorid;
    var course = courseParser(req);

    if (!utorid || !course) {
        sender.sendError(res, 400, "Offer not found");
    } else {
    var query = "SELECT * FROM applications WHERE utorid=$1 AND course=$2";

    pool.query(query, [utorid, course], function(err, result) {
      if (err) {
        sender.sendError(res, 404, err);
      }
      else if (!result.rows.length) {
        sender.sendError(res, 404, "Offer for utorid: " + utorid + " and course: " + course + " not found");
      }
      else {
        sender.sendData(res, result.rows);
      }
    });
  }
};


exports.putOffer = function(req, res) {
  var body = req.body;

  pool.query("SELECT * FROM applications WHERE utorid=$1 AND course=$2",
   [body.utorid, body.course], function(err, result) {
    if (err) {
      sender.sendError(res, 400, err);
    }
    else if (!result.rowCount) {
      sender.sendError(res, 404, "Offer not found");
    }
    else {
      // Found previous data
      var data = result.rows[0];
      var assigned = body.assigned || data.assigned;
      var accepted = body.accepted || data.accepted;
      var course = body.course || data.course;
      var query = "UPDATE applications SET assigned=$1, accepted=$2 WHERE utorid=$3 AND course=$4";

      /* Extra functionality for an edge case here: if body.accepted is true
      *  (the applicant accepted an offer), rerun recommendation ranking for
      *  every course they show up in the top list for
      *  Not building for MVP
      */

      pool.query(query, [assigned, accepted, body.utorid, body.course], function(err, result) {
          if (err) {
              sender.sendError(res, 400, err);
          }
          else if (!result.rowCount) {
              sender.sendError(res, 404, "Offer not found");
          }
          else {
              if (body.course !== data.course) {
                  exports.updateAssignedCourse(body.utorid, data.course, body.course, res);
              }
              res.sendStatus(200);

          }
      });
    }
  });
};

exports.deleteOffer = function(req, res) {
  // Assume that the concatenated course code is already available

  var que = req.query;

  if (!que.utorid || !que.course) {
    sender.sendError(res, 404, "Offer not found");
  } else {
    var query = "DELETE FROM applications WHERE utorid=$1 AND course=$2";
    pool.query(query, [que.utorid, que.course], function(err, result) {
      if (err) {
        sender.sendError(res, 400, err);
      }
      else {
        exports.updateAssignedCourse(que.utorid, que.course, null, res);
      }
    });
  }
};


// Pending Offers

exports.getOffersPending = function(req, res) {
  var limit = req.query.limit || 'ALL';
  var offset = req.query.offset || 0;
  var query = "SELECT * FROM applications WHERE assigned='true' AND accepted='false'ORDER BY utorid ASC LIMIT " + limit + " OFFSET " + offset;

  pool.query(query, function(err, result) {
    if (err) {
      sender.sendError(res, 400, err);
    }
    else {
      sender.sendData(res, result.rows);
    }
  });
};
