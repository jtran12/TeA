import fetch from 'isomorphic-fetch';

class CourseAPI {

  static getCourses() {
    const COURSE_MOCK_URL = './mock/course/course.json';
    return fetch(COURSE_MOCK_URL).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }
}

export default CourseAPI;
