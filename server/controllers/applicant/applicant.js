var sender = require(appRoot + '/controllers/sender.js');
var pool = require(appRoot + '/controllers/database/database.js').pool;
var recommendation = require(appRoot + '/controllers/recommender/recommender.js');


exports.postApplicant = function(req, res) {
  var applicant = req.body;
  var query = "INSERT INTO applicants VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)";

  pool.query(query, [applicant.utorid.toLowerCase(), applicant.studentnumber, applicant.familyname.toLowerCase(),
  applicant.givenname.toLowerCase(), applicant.program.toLowerCase(), applicant.year, applicant.phonenumber,
  applicant.email.toLowerCase(), applicant.studentdepartment.toLowerCase(), applicant.tacourses, applicant.courses,
  applicant.declined, applicant.declinedcount, applicant.declinedcourses, applicant.appliedcourses,
  applicant.currentAssignedCourses], function(err, result) {
    if (err) {
      sender.sendError(res, 400, err);
    }
    else {
      recommendation.updateRecommendations(applicant.utorid);
      res.sendStatus(200);
    }
  });
};


exports.getApplicant = function(req, res) {
  var utorid = req.query.utorid.toLowerCase();

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
  var query = "UPDATE applicants SET familyname=$2, givenname=$3, program=$4, year=$5, phonenumber=$6, email=$7," +
        " studentdepartment=$8, tacourses=$9, courses=$10, declined=$11, declinedcount=$12, declinedcourses=$13," +
        " appliedcourses=$14, currentAssignedCourses=$15 WHERE utorid=$1";

  pool.query("SELECT * FROM applicants WHERE utorid=$1", [applicant.utorid.toLowerCase()], function(err, result) {
    if (err) {
      sender.sendError(res, 400, err);
    }
    else if (!result.rowCount) {
      sender.sendError(res, 404, "Applicant: " + applicant.utorid + " not found");
    }
    else {
	  var data = result.rows[0];
      var familyname = applicant.familyname || data.familyname;
      var givenname = applicant.givenname || data.givenname;
      var program = applicant.program || data.program;
      var year = applicant.year || data.year;
      var phonenumber = applicant.phonenumber || data.phonenumber;
      var email = applicant.email || data.email;
      var studentdepartment = applicant.studentdepartment || data.studentdepartment;
      var tacourses = applicant.tacourses || data.tacourses;
      var courses = applicant.courses || data.courses;
      var declined = applicant.declined || data.declined;
      var declinedcount = applicant.declinedcount || data.declinedcount;
      var declinedcourses = applicant.declinedcourses || data.declinedcourses;
      var appliedcourses = applicant.appliedcourses || data.appliedcourses;
      var currentAssignedCourses = applicant.currentAssignedCourses || data.currentAssignedCourses;

      pool.query(query, [applicant.utorid, familyname.toLowerCase(), givenname.toLowerCase(), program.toLowerCase(),
      year, phonenumber, email.toLowerCase(), studentdepartment.toLowerCase(), tacourses, courses, declined,
      declinedcount, declinedcourses, appliedcourses, currentAssignedCourses], function(err, result) {
        if (err) {
          sender.sendError(res, 400, err);
        }
        else if (!result.rowCount) {
          sender.sendError(res, 404, "Applicant: " + applicant.utorid + " not found");
        }
        else {
          recommendation.updateRecommendations(applicant.utorid);
          res.sendStatus(200);
        }
      });
    }
  });
};
  

exports.deleteApplicant = function(req, res) {
  var utorid = req.query.utorid.toLowerCase();

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
