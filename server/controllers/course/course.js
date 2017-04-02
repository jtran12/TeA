var sender = require(appRoot + '/controllers/sender.js');
var pool = require(appRoot + '/controllers/database/database.js').pool;

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
  else if (query.course) {
    return query.course;
  }

  return genCourse(query);
}

exports.getCourse = function(req, res) {
  var id = courseParser(req);

  if (!id) {
    sender.sendError(res, 400, "Course not found");
  }
  else {
    var query = "SELECT * FROM courses WHERE course=$1";
    pool.query(query, [id], function(err, result) {
      if (err) {
        sender.sendError(res, 404, err);
      }
      else if (!result.rows.length) {
        sender.sendError(res, 404, "Course with id: " + id + " not found");
      }
      else {
        sender.sendData(res, result.rows);
      }
    });
  }
};

exports.deleteCourse = function(req, res) {
  var id = courseParser(req);

  if (!id) {
    sender.sendError(res, 404, "Course not found");
  }
  else {
    var query = "DELETE FROM courses WHERE course=$1";
    pool.query(query, [id], function(err, result) {
      if (err) {
        sender.sendError(res, 400, err);
      }
      else {
        res.sendStatus(200);
      }
    });
  }
};

exports.postCourse = function(req, res) {
  var body = req.body;
  var query = "INSERT INTO courses VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)";
  pool.query(query, [body.course, body.coursecode, body.term, body.year, body.requirements, body.head_instructor, body.additional_instructors, body.tas, body.expected_enrollment, body.current_enrollment, body.max_enrollment, body.currentta, body.maxta, [], function(err, result) {
    if (err) {
      sender.sendError(res, 404, err);
    }
    else {
      res.sendStatus(200);
    }
  });
};

exports.putCourse = function(req, res) {
  var body = req.body;
  var query = "UPDATE courses SET requirements=$1, head_instructor=$2, additional_instructors=$3, tas=$4, expected_enrollment=$5, current_enrollment=$6, max_enrollment=$7, currentta=$8, maxta=$9, recommended_applicants=$10 WHERE course=$10";

  pool.query("SELECT * FROM courses WHERE course=$1", [body.course], function(err, result) {
    if (err) {
      sender.sendError(res, 400, err);
    }
    else if (!result.rowCount) {
      sender.sendError(res, 404, "Course not found");
    }
    else {
      var data = result.rows[0];
      var req = body.requirements || data.requirements;
      var head = body.head_instructor || data.head_instructor;
      var additional = body.additional_instructors || data.additional_instructors;
      var tas = body.tas || data.tas;
      var expected = body.expected_enrollment || data.expected_enrollment;
      var current = body.current_enrollment || data.current_enrollment;
      var max = body.max_enrollment || data.max_enrollment;
      var currentta = body.currentta || data.currentta;
      var maxta = body.maxta || data.maxta;

      pool.query(query, [req, head, additional, tas, expected, current, max, currentta, maxta, body.course], function(err, result) {
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

exports.postCourseBulk = function(req, res) {
  var data = JSON.parse(req.body.data);
  var query = "INSERT INTO courses VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) " +
        "ON CONFLICT (course) DO UPDATE SET requirements=$5, head_instructor=$6, additional_instructors=$7, tas=$8, expected_enrollment=$9, current_enrollment=$10, max_enrollment=$11, currentta=$12, maxta=$13, recommended_applicants=$14";

  var error = null;
  for (var i = 0; i < data.length; i++) {
    if (error) {
      break;
    }

    var entry = data[i];
    pool.query(query, [entry.course, entry.coursecode, entry.term, entry.year, entry.requirements, entry.head_instructor, entry.additional_instructors, entry.tas, entry.expected_enrollment, body.current_enrollment, body.max_enrollment, body.currentta, body.maxta, []], function(err, result) {
      if (err) {
        error = err;
      }
    });
  }

  if (!error) {
    res.sendStatus(200);
  }
  else {
    sender.sendError(res, 400, error);
  }
};

exports.getCourseBulk = function(req, res) {
  var limit = req.query.limit || 'ALL';
  var offset = req.query.offset || 0;
  var query = "SELECT * FROM courses ORDER BY course ASC LIMIT " + limit + " OFFSET " + offset;
  pool.query(query, function(err, result) {
    if (err) {
      sender.sendError(res, 400, err);
    }
    else {
      sender.sendData(res, result.rows);
    }
  });
};

exports.deleteCourseBulk = function(req, res) {
  var query = "DELETE FROM courses";
  pool.query(query, function(err, result) {
    if (err) {
      sender.sendError(res, 400, err);
    }
    else {
      res.sendStatus(200);
    }
  });
};
