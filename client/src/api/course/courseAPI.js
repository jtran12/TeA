import fetch from 'isomorphic-fetch';

class CourseAPI {

  static getCourses(currSize) {
    const COURSE_API = `http://localhost:3000/course/bulk?limit=10&offset=${currSize}`;
    return fetch(COURSE_API)
      .then(response => response.json())
      .catch(error => error);
  }

  // course refers to:
  //  - the current selected course in course view
  // applicantID refers to:
  //  - applicants listed on the assign applicants modal in course view
  static assignCourseToApplicant(course, applicant) {
    const init = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        course: course.course,
        utorid: applicant.utorid
      })
    };
    const APPLICANT_API = 'http://localhost:3000/offer';
    return fetch(APPLICANT_API, init)
      .then(response => response.json())
      .catch(error => error);
  }

  static unassignCourseToApplicant(course, applicantID) {
    const init = {
      method: 'DELETE'
    };
    const APPLICANT_API = `http://localhost:3000/offer?course=${course}&utorid=${applicantID}`;
    return fetch(APPLICANT_API, init)
        .then(response => response.json())
  .catch(error => error);
  }
}

export default CourseAPI;
