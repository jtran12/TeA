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
