var pool = require(appRoot + '/controllers/database/database.js').pool;

function sendError(res, errorCode, errorMst) {
  var json = {"success" : "false", "error_code" : errorCode, "errorMst" : errorMst};
  res.status(errorCode).send(json);
}

function sendData(res, data) {
  var json = {"success" : "true", "data" : data};
  res.send(json);
}

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
      sendError(res, 400, err);
    }
    else if (!result.rows.length && name) {
      sendError(res, 404, "Group with name: " + name + " not found");
    }
    else {
      sendData(res, result.rows);
    }
  });
};

exports.postGroup = function(req, res) {
  var body = req.body;
  var query = "INSERT INTO groups VALUES($1, $2, $3, $4)";
  pool.query(query, [body.name, body.course, body.email, body.utorids], function(err, result) {
    if (err) {
      sendError(res, 400, err);
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
      sendError(res, 400, err);
    }
    else if (!result.rowCount) {
      sendError(res, 404, "Group not found");
    }
    else {
	  var data = result.rows[0];
	  var course = body.course || data.course;
	  var email = body.email || data.email;
	  var utorids = body.utorids || data.utorids;

	  pool.query(query, [course, email, utorids, body.name], function(err, result) {
        if (err) {
          sendError(res, 400, err);
        }
        else if (!result.rowCount) {
          sendError(res, 404, "Group not found");
        }
        else {
          res.sendStatus(200);
        }
      });
    }
  });
};

