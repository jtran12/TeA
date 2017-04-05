import ApplicantAPI from '../../api/applicant/applicantAPI';

const SELECT_APPLICANT = 'SELECT_APPLICANT';
const DESELECT_APPLICANT = 'DESELECT_APPLICANT';
const LOAD_APPLICANTS_REQUEST = 'LOAD_APPLICANTS_REQUEST';
const LOAD_APPLICANTS_SUCCESS = 'LOAD_APPLICANTS_SUCCESS';
const LOAD_APPLICANTS_FAILURE = 'LOAD_APPLICANTS_FAILURE';

export function selectApplicant(applicant) {
  return {
    type: SELECT_APPLICANT,
    applicant
  };
}

export function deselectApplicant() {
  return {
    type: DESELECT_APPLICANT
  };
}

export function loadApplicantsRequest() {
  return {
    type: LOAD_APPLICANTS_REQUEST,
    isFetching: true
  };
}

export function loadApplicantsSuccess(applicants) {
  return {
    type: LOAD_APPLICANTS_SUCCESS,
    isFetching: false,
    applicants
  };
}

export function loadApplicantsFailure(error) {
  return {
    type: LOAD_APPLICANTS_FAILURE,
    isFetching: false,
    error
  };
}

export function loadApplicants(curr) {
  return (dispatch) => {
    dispatch(loadApplicantsRequest());
    return ApplicantAPI.getApplicants(curr.length).then((applicants) => {
      dispatch(loadApplicantsSuccess(applicants));
    }).catch((error) => {
      dispatch(loadApplicantsFailure(error));
    });
  };
}
