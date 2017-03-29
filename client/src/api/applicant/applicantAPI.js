import fetch from 'isomorphic-fetch';

class ApplicantAPI {

  static getApplicants() {

    const APPLICANT_API = 'http://localhost:3000/applicant/bulk';
    const MOCK_API = '../../mock/applicant/applicant.json';

    return fetch(MOCK_API)
      .then(response => response.json())
      .catch(error => error);
  }
}

export default ApplicantAPI;
