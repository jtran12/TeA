var path = require('path');
var index = require(path.join(__dirname, 'index'));
var course = require(path.join(__dirname, 'course', 'course'));
var offer = require(path.join(__dirname, 'offer', 'offer'));

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
    
    // Applications (Offers)
    app.post('/offer', offer.postOffer);
    app.get('/offer', offer.getOffer);
    app.put('/offer', offer.putOffer);
    app.delete('/offer', offer.deleteOffer);
    
    app.get('/offer/pending', offer.getOffersPending);
}