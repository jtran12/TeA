import fetch from 'isomorphic-fetch';

class CourseAPI {

  static getCourses() {

    const COURSE_MOCK_URL = 'http://localhost:3000/course/bulk';

    return fetch(COURSE_MOCK_URL, options)
      .then(response => response.json())
      .catch(error => error);
  }
}

export default CourseAPI;
