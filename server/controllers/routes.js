var path = require('path');
var index = require(path.join(__dirname, 'index'));

module.exports = function(app) {
	app.get('/', index.getIndex);
}