var pool = require(appRoot + '/controllers/database/database.js').pool;


function sendError(res, errorCode, errorMst) {
	var json = {"success" : "false", "error_code" : errorCode, "errorMst" : errorMst};
	res.status(errorCode).send(json);
}

function sendData(res, data) {
	var json = {"success" : "true", "data" : data};
	res.send(json);
}

function genCourse(query) {
    // generates the course code
    
    if (query.coursecode && query.term && query.year) {
        console.log('Creating the course code');

        return query.coursecode + query.term + query.year;
    }
    return null;
}

function courseParser(req) {
	var query = req.query;
    var course = null;
	
	if (query.id) {
		return query.id;
	}
	else if (course=genCourse(query))  {
		return course;
	}
    else {
		return null;
	}
}



exports.postOffer = function(req, res) {
	
    var body = req.body;
    var course = genCourse(body);
    
    if (!course) {
        sendError(res, 400, "Missing course fields");
    } else {
        
        // Check if offer exists already
        var query = "SELECT * FROM applications WHERE utorid=$1 AND course=$2";
        
		pool.query(query, [body.utorid, course], function(err, result) {
			if (err) {
				sendError(res, 404, err);
			}
			else {
				if (!result.rows.length) {
					// Make new entry
                    
                    var query = "INSERT INTO applications VALUES($1, $2, $3, $4)";
                    
                    pool.query(query, [body.utorid, course, "true", "false"], function(err, result) {
                        if (err) {
                            sendError(res, 400, err);
                        }
                        else {
                            res.sendStatus(200);
                        }
                    });
				}
				else {
					sendError(res, 400, "The offer already exists.");
				}
			}
		});
        
    }
}

exports.getOffer = function(req, res) {
         
    var utorid = req.query.utorid;  
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
    // Assume that the concatenated course code is already available
    
	var body = req.body;
      
    if (!body.utorid || !body.course) {
        sendError(res, 400, "Offer not found");
    } else {
        // The TA coordinator doesn't set whether a TA accepted or not
        var query = "UPDATE applications SET assigned=$1, accepted=$2 WHERE utorid=$3 AND course=$4";
        
        pool.query(query, [body.assigned, body.accepted, body.utorid, body.course], function(err, result) {
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
}

exports.deleteOffer = function(req, res) {
	// Assume that the concatenated course code is already available
	var query = req.query;
    
	if (!query.utorid || !query.course) {
		sendError(res, 404, "Offer not found");
	}
	else {
		var query = "DELETE FROM applications WHERE utorid=$1 AND course=$2";
		pool.query(query, [query.utorid, query.course], function(err, result) {
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

