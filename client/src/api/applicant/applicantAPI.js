import fetch from 'isomorphic-fetch';

class ApplicantAPI {

  static getApplicants(currSize) {

    const APPLICANT_API = `http://localhost:3000/applicant/all?limit=10&offset=${currSize}`;

    return fetch(APPLICANT_API)
      .then(response => response.json())
      .catch(error => error);
  }
}

export default ApplicantAPI;
