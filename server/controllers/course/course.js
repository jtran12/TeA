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
	res.status(errorCode).send(json);
}

function sendData(res, data) {
	var json = {"success" : "true", "data" : data};
	res.send(json);
}

exports.getCourse = function(req, res) {
	var id = courseParser(req);
	
	if (!id) {
		sendError(res, 400, "Course not found");
	}
	else { 
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
}

exports.deleteCourse = function(req, res) {
	var id = courseParser(req);
	
	if (!id) {
		sendError(res, 400, "Course not found");
	}
	else {
		var query = "DELETE FROM courses WHERE course=$1";
		pool.query(query, [id], function(err, result) {
			if (err) {
				sendError(res, 404, err);
			}
			else {
				res.sendStatus(200);
			}
		});
	}
}

exports.postCourse = function(req, res) {
	var body = req.body;
	var query = "INSERT INTO courses VALUES($1, $2, $3, $4, $5)";
	pool.query(query, [body.course, body.coursecode, body.term, body.year, body.requirements], function(err, result) {
		if (err) {
			sendError(res, 404, err);
		}
		else {
			res.sendStatus(200);
		}
	});
}

exports.putCourse = function(req, res) {
	var body = req.body;
	var query = "UPDATE courses SET requirements=$1 WHERE course=$2";
	pool.query(query, [body.requirements, body.course], function(err, result) {
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
}


