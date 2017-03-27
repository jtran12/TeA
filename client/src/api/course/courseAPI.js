import fetch from 'isomorphic-fetch';

class CourseAPI {

  static getCourses() {

    const COURSE_API = 'http://localhost:3000/course/bulk';

    return fetch(COURSE_API)
      .then(response => response.json())
      .catch(error => error);
  }
}

export default CourseAPI;
