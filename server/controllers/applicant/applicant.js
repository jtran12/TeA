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
  var applicant = JSON.parse(req.body.applicant);
  var query = "INSERT INTO applicants VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)";

  pool.query(query, [applicant.utorid, applicant.studentnumber, applicant.familyname, applicant.givenname,
  applicant.program, applicant.year, applicant.phonenumber, applicant.email,
  applicant.studentdepartment, applicant.tacourses, applicant.courses, applicant.applied_courses, applicant.declined,
  applicant.declinedcount, applicant.declinedcourses], function(err, result) {
    if (err) {
      sendError(res, 404, err);
    }
    else {
      res.sendStatus(200);
    }
  });
};


exports.getApplicant = function(req, res) {
  var id = req.query.studentnumber;

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
  var applicant = JSON.parse(req.body.applicant);
  var query = "UPDATE applicants SET studentnumber=$2, familyname=$3, givenname=$4, program=$5," +
        "year=$6, phonenumber=$7, email=$8, studentdepartment=$9, tacourses=$10, courses=$11," +
        " applied_courses=$12, declined=$13, declinedcount=$14, declinedcourses=$15 WHERE utorid=$1";
  pool.query(query, [applicant.utorid, applicant.studentnumber, applicant.familyname, applicant.givenname,
  applicant.program, applicant.year, applicant.phonenumber, applicant.email,
  applicant.studentdepartment, applicant.tacourses, applicant.courses, applicant.applied_courses, applicant.declined,
  applicant.declinedcount, applicant.declinedcourses], function(err, result) {
    if (err) {
      sendError(res, 400, err);
    }
    else if (!result.rowCount) {
      sendError(res, 404, "Applicant not found");
    }
    else {
      res.sendStatus(200);
    }
  });
};


exports.deleteApplicant = function(req, res) {
  var id = req.query.studentnumber;

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


exports.postApplicantFilter = function(req, res) {
  return null;
};
