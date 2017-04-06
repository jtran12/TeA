import ApplicantAPI from '../../api/applicant/applicantAPI';

const SELECT_APPLICANT = 'SELECT_APPLICANT';
const DESELECT_APPLICANT = 'DESELECT_APPLICANT';
const LOAD_APPLICANTS_REQUEST = 'LOAD_APPLICANTS_REQUEST';
const LOAD_APPLICANTS_SUCCESS = 'LOAD_APPLICANTS_SUCCESS';
const LOAD_APPLICANTS_FAILURE = 'LOAD_APPLICANTS_FAILURE';
const ASSIGN_APPLICANT_TO_COURSE = 'ASSIGN_APPLICANT_TO_COURSE';
const ASSIGN_APPLICANT_TO_COURSE_SUCCESS = 'ASSIGN_APPLICANT_TO_COURSE_SUCCESS';
const ASSIGN_APPLICANT_TO_COURSE_FAILURE = 'ASSIGN_APPLICANT_TO_COURSE_FAILURE';
const UNASSIGN_APPLICANT_TO_COURSE = 'UNASSIGN_APPLICANT_TO_COURSE';
const UNASSIGN_APPLICANT_TO_COURSE_SUCCESS = 'UNASSIGN_APPLICANT_TO_COURSE_SUCCESS';
const UNASSIGN_APPLICANT_TO_COURSE_FAILURE = 'UNASSIGN_APPLICANT_TO_COURSE_FAILURE';

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

export function assignApplicantToCourse() {
  return {
    type: ASSIGN_APPLICANT_TO_COURSE,
    isFetching: true,
  };
}

export function assignApplicantToCourseSuccess() {
  return {
    type: ASSIGN_APPLICANT_TO_COURSE_SUCCESS,
    isFetching: false,
  };
}

export function assignApplicantToCourseFailure(error) {
  return {
    type: ASSIGN_APPLICANT_TO_COURSE_FAILURE,
    isFetching: false,
    error
  };
}

export function unassignApplicantToCourse() {
  return {
    type: UNASSIGN_APPLICANT_TO_COURSE,
    isFetching: true,
  };
}

export function unassignApplicantToCourseSuccess() {
  return {
    type: UNASSIGN_APPLICANT_TO_COURSE_SUCCESS,
    isFetching: false,
  };
}

export function unassignApplicantToCourseFailure(error) {
  return {
    type: UNASSIGN_APPLICANT_TO_COURSE_FAILURE,
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

export function assignApplicant() {
  return (dispatch) => {
    dispatch(assignApplicantToCourse());
    return ApplicantAPI.assignApplicantToCourse().then((applicants) => {
      dispatch(assignApplicantToCourseSuccess(applicants));
    }).catch((error) => {
      dispatch(assignApplicantToCourseFailure(error));
    });
  };
}

export function unassignApplicant() {
  return (dispatch) => {
    dispatch(unassignApplicantToCourse());
    return ApplicantAPI.assignApplicantToCourse().then((applicants) => {
      dispatch(unassignApplicantToCourseSuccess(applicants));
    }).catch((error) => {
      dispatch(unassignApplicantToCourseFailure(error));
    });
  };
}
