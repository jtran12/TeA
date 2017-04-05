import fetch from 'isomorphic-fetch';

class ApplicantAPI {

  static getApplicants(currSize) {
    const APPLICANT_API = `http://localhost:3000/applicant/all?limit=10&offset=${currSize}`;
    return fetch(APPLICANT_API)
      .then(response => response.json())
      .catch(error => error);
  }

  static assignApplicantToCourse(course) {
    const init = {
      method: 'POST',
      body: JSON.stringify({
        course: course.course,
        coursecode: course.corsecode,
        term: course.term,
        year: course.year,
        utorid: course.utorid
      })
    }
    const APPLICANT_API = `http://localhost:3000/offer`;
    return fetch(APPLICANT_API, init)
      .then(response => response.json())
      .catch(error => error);
  }
}

export default ApplicantAPI;
