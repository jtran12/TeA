var sender = require(appRoot + '/controllers/sender.js');
var pool = require(appRoot + '/controllers/database/database.js').pool;
var nodemailer = require('nodemailer');

var smtpConfig = {
    host : 'smtp.gmail.com',
    port : 465,
    secure : true,
    auth : {
        user : "csc302project@gmail.com",
        pass : "csc302project123"
    }
};

var transporter = nodemailer.createTransport(smtpConfig);

exports.getGroup = function(req, res) {
  if (req.query.name) {
    var name = req.query.name;
    var query = "SELECT * FROM groups WHERE name='" + name + "'";
  }
  else {
    var limit = req.query.limit || 'ALL';
    var offset = req.query.offset || 0;
    var query = "SELECT * FROM groups ORDER BY name ASC LIMIT " + limit + " OFFSET " + offset;
  }

  pool.query(query, function(err, result) {
    if (err) {
      sender.sendError(res, 400, err);
    }
    else if (!result.rows.length && name) {
      sender.sendError(res, 404, "Group with name: " + name + " not found");
    }
    else {
      sender.sendData(res, result.rows);
    }
  });
};

exports.postGroup = function(req, res) {
  var body = req.body;
  var query = "INSERT INTO groups VALUES($1, $2, $3, $4)";
  pool.query(query, [body.name, body.course, body.email, body.utorids], function(err, result) {
    if (err) {
      sender.sendError(res, 400, err);
    }
    else {
      res.sendStatus(200);
    }
  });
};

exports.putGroup = function(req, res) {
  var body = req.body;
  var query = "UPDATE groups SET course=$1, email=$2, utorids=$3 WHERE name=$4";

  pool.query("SELECT * FROM groups WHERE name=$1", [body.name], function(err, result) {
    if (err) {
      sender.sendError(res, 400, err);
    }
    else if (!result.rowCount) {
      sender.sendError(res, 404, "Group not found");
    }
    else {
      var data = result.rows[0];
      var course = body.course || data.course;
      var email = body.email || data.email;
      var utorids = body.utorids || data.utorids;

      pool.query(query, [course, email, utorids, body.name], function(err, result) {
        if (err) {
          sender.sendError(res, 400, err);
        }
        else if (!result.rowCount) {
          sender.sendError(res, 404, "Group not found");
        }
        else {
          res.sendStatus(200);
        }
      });
    }
  });
};

exports.deleteGroup = function(req, res) {
  var query = "DELETE FROM groups WHERE name=$1";
  pool.query(query, [req.query.name], function(err, result) {
    if (err) {
      sender.sendError(res, 400, err);
    }
    else {
      res.sendStatus(200);
    }
  });
};

exports.postNotify = function(req, res) {
  var name = req.body.name;
  if (!name) {
      sender.sendError(res, 400, "No group name provided");
  }
  else {
    pool.query("SELECT * FROM groups WHERE name=$1", [name], function(err, result) {
      if (err) {
        sender.sendError(res, 400, err);
      }
      else if (!result.rowCount) {
        sender.sendError(res, 404, "Group with that name not found");
      }
      else {
        var data = result.rows[0];
        var course = data.course;
        var email = data.email;
        var utorids = data.utorids;
        var placeholders = utorids.map(function(name, i) {
          return "$" + (i + 1);
        }).join(",");

        pool.query("SELECT * FROM applicants WHERE utorid IN (" + placeholders + ")", utorids, function(err, result) {
          if (err) {
            sender.sendError(res, 400, err);
          }
          else {
            var fullNames = "";
            for (var i = 0; i < result.rows.length; i++) {
                var curr = result.rows[i];
                fullNames += curr.givenname + " " + curr.familyname + "\n";
            }

            const mailOptions = {
              from : "csc302project@gmail.com",
              to : "csc302project@gmail.com",
              subject : "TA Groups " + course,
              text : "Please give input on the proposed TA assignment for " + course + ":\n" + fullNames
            };

            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                sender.sendError(res, 400, "Error sending email");
              }
              else {
                res.sendStatus(200);
              }
            });
          }
        });
      }
    });
  }
};
