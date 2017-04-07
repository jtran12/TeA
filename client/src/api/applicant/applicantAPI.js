import fetch from 'isomorphic-fetch';

class ApplicantAPI {

  static getApplicants(currSize) {
    const APPLICANT_API = `http://localhost:3000/applicant/all?limit=10&offset=${currSize}`;
    return fetch(APPLICANT_API)
      .then(response => response.json())
      .catch(error => error);
  }

  // course refers to:
  //  - courses listed on the assign courses modal in applicant view
  // applicantID refers to:
  //  - the current selected application in applicant view
  static assignApplicantToCourse(course, applicant) {
    const init = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        course: course.course,
        coursecode: course.coursecode,
        term: course.term,
        year: course.year,
        utorid: applicantID
      })
    };
    const APPLICANT_API = 'http://localhost:3000/offer';
    return fetch(APPLICANT_API, init)
      .then(response => response.json())
      .catch(error => error);
  }

  static unassignApplicantToCourse(course, applicantID) {
    const init = {
      method: 'DELETE'
    };
    const APPLICANT_API = `http://localhost:3000/offer?course=${course}&utorid=${applicantID}`;
    return fetch(APPLICANT_API, init)
      .then(response => response.json())
      .catch(error => error);
  }
}

export default ApplicantAPI;
