var pool = require(appRoot + '/controllers/database/database.js').pool;


function sendError(res, errorCode, errorMst) {
	var json = {"success" : "false", "error_code" : errorCode, "errorMst" : errorMst};
	res.status(errorCode).send(json);
}

function sendData(res, data) {
	var json = {"success" : "true", "data" : data};
	res.send(json);
}

function getCourse(query) {
    // generates the course code
    if (query.coursecode && query.term && query.year) {
        return query.coursecode + query.term + query.year;
    }
    return null;
}

function courseParser(req) {
	var query = req.query;
    var course = '';
	
	if (query.id) {
		return query.id;
	}
	else if (course=getCourse(query))  {
		return course;
	}
	else {
		return null;
	}
}



exports.postOffer = function(req, res) {
	
    var body = req.body;
    var course = getCourse(body);
    // Assuming that each post is a new addition, 
    // Assignment will always be guaranteed but might not be accepted yet
    
    if (!course) {
        sendError(res, 400, "Missing course fields");
    } else {
        var query = "INSERT INTO applications VALUES($1, $2, $3, $4)";
        pool.query(query, [body.utorid, body.course, "true", "false"], function(err, result) {
            if (err) {
                sendError(res, 400, err);
            }
            else {
                res.sendStatus(200);
            }
        });
}

exports.getOffer = function(req, res) {
        
    var utorid = req.query.utorid;
    // NTS: Might not be a good idea  to call this function
    // due to the fact that it might return an id rather than
    // the course itself
    var course = courseParser(req);
    
    if (!utorid || !course) {
        sendError(res, 400, "Offer not found");
    } else {
		var query = "SELECT * FROM applications WHERE utorid=$1 AND course=$2";
        
		pool.query(query, [utorid, course], function(err, result) {
			if (err) {
				sendError(res, 404, err);
			}
			else {
				if (!result.rows.length) {
					sendError(res, 404, "Offer for utorid: " + utorid + " and course: " +course + " not found");
				}
				else {
					sendData(res, result.rows);
				}
			}
		});
        
	}
}

exports.putOffer = function(req, res) {
	var body = req.body;
    // NTS: either use offer_id or use both utorid + course
	//var query = "UPDATE applications SET assigned=$1 WHERE offer_id=$2";
    var query = "UPDATE applications SET assigned=$1 WHERE utorid=$2 AND course=$3";
	pool.query(query, [body.assigned, body.utorid, body.course], function(err, result) {
		if (err) {
			sendError(res, 400, err);
		}
		else if (!result.rowCount) {
			sendError(res, 404, "Offer not found");
		}
		else {
			res.sendStatus(200);
		}
	});
}

exports.deleteOffer = function(req, res) {
	
	var utorid = req.query.utorid;
    var course = req.query.course;
    
	if (!utorid || !course) {
		sendError(res, 404, "Offer not found");
	}
	else {
		var query = "DELETE FROM applications WHERE utorid=$1 AND course=$2";
		pool.query(query, [utorid, course], function(err, result) {
			if (err) {
				sendError(res, 400, err);
			}
			else {
				res.sendStatus(200);
			}
		});
	}
}


//////////////////////// PENDING ///////////////////////////////////////

exports.getOffersPending = function(req, res) {
	var query = "SELECT * FROM applications WHERE assigned='true' AND accepted='false'";
	pool.query(query, function(err, result) {
		if (err) {
			sendError(res, 400, err);
		}
		else {
			sendData(res, result.rows);
		}
	});
}

