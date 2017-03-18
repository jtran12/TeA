import fetch from 'isomorphic-fetch';

class CourseAPI {

  static getCourses() {

    // REPLACE COURSE_MOCK_URL WITH SERVER API URL ONCE IT'S THERE !!!
    const COURSE_MOCK_URL = './mock/course/course.json';

    return fetch(COURSE_MOCK_URL)
      .then(response => response.json())
      .catch(error => error);
  }
}

export default CourseAPI;
