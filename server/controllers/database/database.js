/**
 * Database connection settings.
 */
const Pool = require('pg-pool');
var dbUrl = 'postgres://qjtfeiuanuaffh:ee5de19d68a3f7e04bdd6467d1fef8e123343637ce247b97821f5f4cd3c814dd@ec2-50-17-220-223.compute-1.amazonaws.com:5432/d4poo65jp1euqr';
var pgConfig = (dbUrl).split(":");
const config = {
	user: pgConfig[1].substr(2),
	password: pgConfig[2].split("@")[0],
	host: pgConfig[2].split("@")[1],
	port: pgConfig[3].split("/")[0],
	database: pgConfig[3].split("/")[1],
	ssl: true
};
var pool = new Pool(config);

module.exports.pool = pool;

/*

Example Usage:

	var pool = require(appRoot + '/controllers/database/database.js').pool;

	//Any PSQL query
	var testQuery = 'SELECT * FROM tableName';
	pool.query(testQuery, function(err, result) {
		if (err) {
			//handle error
		}
		else {
			var data = result.rows;
			//use data
		}
	});

*/