var sender = require(appRoot + '/controllers/sender.js');
var pool = require(appRoot + '/controllers/database/database.js').pool;

function genCourse(query) {
    // Generates the course code
    
    if (query.coursecode && query.term && query.year) {
        return query.coursecode + query.term + query.year;
    }
    
    return null;
}

function courseParser(req) {
  var query = req.query;
  
  if (query.id) {
    return query.id;
  }
  
  return genCourse(query);
}


// Individual Offers

exports.postOffer = function(req, res) {
  
    var body = req.body;
    var course = genCourse(body);
    
    if (!course) {
        sender.sendError(res, 400, "Missing course fields");
    } else if (!body.utorid) {
        sender.sendError(res, 400, "Missing utorid of TA who's being offered");
    } else {
        // Check if offer exists already
        var query = "SELECT * FROM applications WHERE utorid=$1 AND course=$2";
        
    pool.query(query, [body.utorid, course], function(err, result) {
      if (err) {
        sender.sendError(res, 404, err);
      }
      else if (!result.rows.length) {
          // Make new entry
                    
          query = "INSERT INTO applications VALUES($1, $2, $3, $4)";
          
          pool.query(query, [body.utorid, course, "true", "false"], function(err, result) {
              if (err) {
                  sender.sendError(res, 400, err);
              }
              else {
                  res.sendStatus(200);
              }
          });
      }
      else {
        sender.sendError(res, 400, "The offer already exists.");
      }
    });
        
    }
};

exports.getOffer = function(req, res) {
         
    var utorid = req.query.utorid;
    var course = courseParser(req);
    
    if (!utorid || !course) {
        sender.sendError(res, 400, "Offer not found");
    } else {
    var query = "SELECT * FROM applications WHERE utorid=$1 AND course=$2";
        
    pool.query(query, [utorid, course], function(err, result) {
      if (err) {
        sender.sendError(res, 404, err);
      }
      else if (!result.rows.length) {
        sender.sendError(res, 404, "Offer for utorid: " + utorid + " and course: " + course + " not found");
      }
      else {
        sender.sendData(res, result.rows);
      }
    });
  }
};

exports.putOffer = function(req, res) {
    // Assume that the concatenated course code is already available
    
  var body = req.body;
      
    if (!body.utorid || !body.course) {
        sender.sendError(res, 400, "Offer not found");
    } else {
        // The TA coordinator doesn't set whether a TA accepted or not
        var query = "UPDATE applications SET assigned=$1, accepted=$2 WHERE utorid=$3 AND course=$4";
        
        pool.query(query, [body.assigned, body.accepted, body.utorid, body.course], function(err, result) {
            if (err) {
                sender.sendError(res, 400, err);
            }
            else if (!result.rowCount) {
                sender.sendError(res, 404, "Offer not found");
            }
            else {
                res.sendStatus(200);
            }
        });
    }
};

exports.deleteOffer = function(req, res) {
  // Assume that the concatenated course code is already available
  
  var que = req.query;
    
  if (!que.utorid || !que.course) {
    sender.sendError(res, 404, "Offer not found");
  } else {
    var query = "DELETE FROM applications WHERE utorid=$1 AND course=$2";
    pool.query(query, [que.utorid, que.course], function(err, result) {
      if (err) {
        sender.sendError(res, 400, err);
      }
      else {
        res.sendStatus(200);
      }
    });
  }
};


// Pending Offers

exports.getOffersPending = function(req, res) {
  var query = "SELECT * FROM applications WHERE assigned='true' AND accepted='false'";
  pool.query(query, function(err, result) {
    if (err) {
      sender.sendError(res, 400, err);
    }
    else {
      sender.sendData(res, result.rows);
    }
  });
};

