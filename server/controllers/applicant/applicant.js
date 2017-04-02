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
  applicant.program, applicant.year, applicant.phonenumber, applicant.email, applicant.studentdepartment,
  applicant.tacourses, applicant.courses, applicant.declined, applicant.declinedcount, applicant.declinedcourses,
  applicant.appliedcourses], function(err, result) {
    if (err) {
      sendError(res, 400, err);
    }
    else {
      res.sendStatus(200);
    }
  });
};


exports.getApplicant = function(req, res) {
  var utorid = req.query.utorid;

  if (!utorid) {
    sendError(res, 400, "Invalid parameter: UTORid");
  } else {
    var query = "SELECT * FROM applicants WHERE utorid=$1";
    pool.query(query, [utorid], function(err, result) {
      if (err) {
        sendError(res, 400, err);
      } else if (!result.rows.length) {
          sendError(res, 404, "Applicant with UTORid: " + utorid + " not found");
      } else {
          sendData(res, result.rows);
      }
    });
  }
};


exports.putApplicant = function(req, res) {
  var applicant = JSON.parse(req.body.applicant);
  var query = "UPDATE applicants SET studentnumber=$2, familyname=$3, givenname=$4, program=$5," +
        "year=$6, phonenumber=$7, email=$8, studentdepartment=$9, tacourses=$10, courses=$11," +
        " declined=$12, declinedcount=$13, declinedcourses=$14, appliedcourses=$15 WHERE utorid=$1";
  pool.query(query, [applicant.utorid, applicant.studentnumber, applicant.familyname, applicant.givenname,
  applicant.program, applicant.year, applicant.phonenumber, applicant.email, applicant.studentdepartment,
  applicant.tacourses, applicant.courses, applicant.declined, applicant.declinedcount, applicant.declinedcourses,
  applicant.appliedcourses], function(err, result) {
    if (err) {
      sendError(res, 400, err);
    }
    else if (!result.rowCount) {
      sendError(res, 404, "Applicant: " + applicant.utorid + " not found");
    }
    else {
      res.sendStatus(200);
    }
  });
};


exports.deleteApplicant = function(req, res) {
  var utorid = req.query.utorid;

  if (!utorid) {
    sendError(res, 400, "Invalid parameter: UTORid");
  } else {
    var query = "DELETE FROM applicants WHERE utorid=$1";
    pool.query(query, [utorid], function(err, result) {
      if (err) {
        sendError(res, 400, err);
      } else {
        res.sendStatus(200);
      }
    });
  }
};


exports.postApplicantFilter = function(req, res) {
  return null;
};
