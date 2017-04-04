import fetch from 'isomorphic-fetch';

class ApplicantAPI {

  static getApplicants() {

    const APPLICANT_API = 'http://localhost:3000/applicant?utorid=anniann';

    return fetch(APPLICANT_API)
      .then(response => response.json())
      .catch(error => error);
  }
}

export default ApplicantAPI;
