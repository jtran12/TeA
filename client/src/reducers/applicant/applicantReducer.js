import createInitialApplicantState from '../../state/applicant/applicantState';

export default function applicantReducer(state = createInitialApplicantState(), action) {

  switch (action.type) {

    case 'SELECT_APPLICANT':
      return Object.assign({}, state, {selectedApplicant: action.applicant });

    case 'DESELECT_APPLICANT':
      return Object.assign({}, state, {selectedApplicant: null });

    case 'LOAD_APPLICANTS_REQUEST':
      return Object.assign({}, state, {isFetching: true });

    case 'LOAD_APPLICANTS_SUCCESS':
      return Object.assign({}, state, {isFetching: false, applicants: action.applicants.data });

    case 'LOAD_APPLICANTS_FAILURE':
      return Object.assign({}, state, {isFetching: false });

    default:
      return state;
  }
}
