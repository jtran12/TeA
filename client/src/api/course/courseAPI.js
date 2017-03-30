import fetch from 'isomorphic-fetch';

class CourseAPI {

  static getCourses(currSize) {
    const COURSE_API = 'http://localhost:3000/course/bulk?limit=10&offset=' + currSize;

    return fetch(COURSE_API)
      .then(response => response.json())
      .catch(error => error);
  }
}

export default CourseAPI;
