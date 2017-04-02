var sender = require(appRoot + '/controllers/sender.js');
var pool = require(appRoot + '/controllers/database/database.js').pool;


exports.postApplicant = function(req, res) {
  var applicant = req.body;
  var query = "INSERT INTO applicants VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)";

  pool.query(query, [applicant.utorid, applicant.studentnumber, applicant.familyname, applicant.givenname,
  applicant.program, applicant.year, applicant.phonenumber, applicant.email, applicant.studentdepartment,
  applicant.tacourses, applicant.courses, applicant.declined, applicant.declinedcount, applicant.declinedcourses,
  applicant.appliedcourses, applicant.currentAssignedCourses], function(err, result) {
    if (err) {
      sender.sendError(res, 400, err);
    }
    else {
      res.sendStatus(200);
    }
  });
};


exports.getApplicant = function(req, res) {
  var utorid = req.query.utorid;

  if (!utorid) {
    sender.sendError(res, 400, "Invalid parameter: UTORid");
  }
  else {
    var query = "SELECT * FROM applicants WHERE utorid=$1";
    pool.query(query, [utorid], function(err, result) {
      if (err) {
        sender.sendError(res, 400, err);
      }
      else if (!result.rows.length) {
          sender.sendError(res, 404, "Applicant with UTORid: " + utorid + " not found");
      }
      else {
          sender.sendData(res, result.rows);
      }
    });
  }
};


exports.putApplicant = function(req, res) {
  var applicant = req.body;
  var query = "UPDATE applicants SET studentnumber=$2, familyname=$3, givenname=$4, program=$5," +
        "year=$6, phonenumber=$7, email=$8, studentdepartment=$9, tacourses=$10, courses=$11," +
        " declined=$12, declinedcount=$13, declinedcourses=$14, appliedcourses=$15, currentAssignedCourses=$16 " +
        "WHERE utorid=$1";
  pool.query(query, [applicant.utorid, applicant.studentnumber, applicant.familyname, applicant.givenname,
  applicant.program, applicant.year, applicant.phonenumber, applicant.email, applicant.studentdepartment,
  applicant.tacourses, applicant.courses, applicant.declined, applicant.declinedcount, applicant.declinedcourses,
  applicant.appliedcourses, applicant.currentAssignedCourses], function(err, result) {
    if (err) {
      sender.sendError(res, 400, err);
    }
    else if (!result.rowCount) {
      sender.sendError(res, 404, "Applicant: " + applicant.utorid + " not found");
    }
    else {
      res.sendStatus(200);
    }
  });
};


exports.deleteApplicant = function(req, res) {
  var utorid = req.query.utorid;

  if (!utorid) {
    sender.sendError(res, 400, "Invalid parameter: UTORid");
  }
  else {
    var query = "DELETE FROM applicants WHERE utorid=$1";
    pool.query(query, [utorid], function(err, result) {
      if (err) {
        sender.sendError(res, 400, err);
      } else {
        res.sendStatus(200);
      }
    });
  }
};


exports.postApplicantFilter = function(req, res) {
  return null;
};

exports.getAllApplicants = function(req, res) {
  var limit = req.query.limit || 'ALL';
  var offset = req.query.offset || 0;
  var query = "SELECT * FROM applicants ORDER BY utorid ASC LIMIT " + limit + " OFFSET " + offset;
  pool.query(query, function(err, result) {
    if (err) {
      sender.sendError(res, 400, err);
    }
    else {
      sender.sendData(res, result.rows);
    }
  });
};
