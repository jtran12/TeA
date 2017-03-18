var pool = require(appRoot + '/controllers/database/database.js').pool;


function sendError(res, errorCode, errorMsg) {
  var json = {"success" : "false", "error_code" : errorCode, "errorMst" : errorMsg};
  res.status(errorCode).send(json);
}


function sendData(res, data) {
  var json = {"success" : "true", "data" : data};
  res.send(json);
}


exports.postApplicant = function(req, res) {
  var applicant = req.body.applicant;
  var query = "INSERT INTO applicants VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)";

  pool.query(query, [applicant.utorid, applicant.a_id, applicant.family_name,
  applicant.given_name, applicant.program, applicant.year, applicant.phone, applicant.email,
  applicant.department, applicant.ta_courses, applicant.courses, applicant.declined,
  applicant.declined_count, applicant.declined_courses], function(err, result) {
    if (err) {
      sendError(res, 404, err);
    }
    else {
      res.sendStatus(200);
    }
  });
};


exports.getApplicant = function(req, res) {
  var id = req.query.student_id;
  
  if (!id) {
    sendError(res, 400, "Invalid parameter: ID");
  }
  else {
    var query = "SELECT * FROM applicants WHERE studentnumber=$1";
    pool.query(query, [id], function(err, result) {
      if (err) {
        sendError(res, 404, err);
      }
      else if (!result.rows.length) {
          sendError(res, 404, "Applicant with student number: " + id + " not found");
      }
      else {
          sendData(res, result.rows);
      }
    });
  }
};


exports.putApplicant = function(req, res) {
  var applicant = req.body.applicant;
  var query = "UPDATE applicants SET utorid=$1, studentnumber=$2, familyname=$3, givenname=$4, program=$5," +
        "year=$6, phonenumber=$7, email=$8, studentdepartment=$9, tacourses=$10, courses=$11," +
        " declined=$12, declinedcount=$13, declinedcourses=$14 WHERE utorid=$1";
  pool.query(query, [applicant.utorid, applicant.a_id, applicant.family_name,
  applicant.given_name, applicant.program, applicant.year, applicant.phone, applicant.email,
  applicant.department, applicant.ta_courses, applicant.courses, applicant.declined,
  applicant.declined_count, applicant.declined_courses], function(err, result) {
    if (err) {
      sendError(res, 400, err);
    }
    else if (!result.rowCount) {
      sendError(res, 404, "Course not found");
    }
    else {
      res.sendStatus(200);
    }
  });
};


exports.deleteApplicant = function(req, res) {
  var id = req.query.a_id;

  if (!id) {
    sendError(res, 404, "Invalid parameter: ID");
  }
  else {
    var query = "DELETE FROM applicants WHERE studentnumber=$1";
    pool.query(query, [id], function(err, result) {
      if (err) {
        sendError(res, 400, err);
      }
      else {
        res.sendStatus(200);
      }
    });
  }
};


exports.postApplicantFilter = function(req, res) {};
