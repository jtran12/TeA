var path = require('path');
var index = require(path.join(__dirname, 'index'));
var course = require(path.join(__dirname, 'course', 'course'));

module.exports = function(app) {
	app.get('/', index.getIndex);
	
    // Course
	app.get('/course', course.getCourse);
	app.post('/course', course.postCourse);
	app.put('/course', course.putCourse);
	app.delete('/course', course.deleteCourse);
	
	app.get('/course/bulk', course.getCourseBulk);
	app.post('/course/bulk', course.postCourseBulk);
	app.delete('/course/bulk', course.deleteCourseBulk);
    
    // Offer
    app.post('/offer', offer.postOffer);
}