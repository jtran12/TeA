var path = require('path');
var index = require(path.join(__dirname, 'index'));
var course = require(path.join(__dirname, 'course', 'course'));

module.exports = function(app) {
	app.get('/', index.getIndex);
	
	app.get('/course', course.getCourse);
	app.delete('/course', course.deleteCourse);
	app.post('/course', course.postCourse);
	app.put('/course', course.putCourse);
	app.post('/course/bulk', course.postCourseBulk);
	app.get('/course/bulk', course.getCourseBulk);
	app.delete('/course/bulk', course.deleteCourseBulk);
}