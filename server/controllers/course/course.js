var pool = require(appRoot + '/controllers/database/database.js').pool;

function courseParser(req) {
	var query = req.query;
	
	if (query.id) {
		return query.id;
	}
	else if (query.coursecode && query.term && query.year) {
		return query.coursecode + query.term + query.year;
	}
	else {
		return null;
	}
}

function sendError(res, errorCode, errorMst) {
	var json = {"success" : "false", "error_code" : errorCode, "errorMst" : errorMst};
	res.send(json);
}

function sendData(res, data) {
	var json = {"success" : "true", "data" : data};
	res.send(json);
}

exports.getCourse = function(req, res) {
	var id = courseParser(req);
	
	if (!id) {
		sendError(res, 400, "Invalid query");
	}
	
	var query = "SELECT * FROM courses WHERE course=$1";
	
	pool.query(query, [id], function(err, result) {
		if (err) {
			sendError(res, 404, err);
		}
		else {
			if (!result.rows.length) {
				sendError(res, 404, "Course with id: " + id + " not found");
			}
			else {
				sendData(res, result.rows);
			}
		}
	});
}

