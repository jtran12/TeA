import createInitialApplicantState from '../../state/applicant/applicantState';

function getIndex(value, arr, prop) {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i][prop] === value) {
      return i;
    }
  }
  return -1;
}

export default function applicantReducer(state = createInitialApplicantState(), action) {

  switch (action.type) {

    case 'SELECT_APPLICANT':
      return Object.assign({}, state, {selectedApplicant: action.applicant });

    case 'DESELECT_APPLICANT':
      return Object.assign({}, state, {selectedApplicant: null });

    case 'LOAD_APPLICANTS_REQUEST':
      return Object.assign({}, state, {isFetching: true });

    case 'LOAD_APPLICANTS_SUCCESS':
      return Object.assign({}, state, {isFetching: false,
        applicants: [...state.applicants, ...action.applicants.data],
        full: action.applicants.data.length === 0});

    case 'LOAD_APPLICANTS_FAILURE':
      return Object.assign({}, state, {isFetching: false });

    case 'ASSIGN_APPLICANT_TO_COURSE':
      return Object.assign({}, state, {isFetching: true });

    case 'ASSIGN_APPLICANT_TO_COURSE_SUCCESS':
      return Object.assign({}, state, {isFetching: false });

    case 'ASSIGN_APPLICANT_TO_COURSE_FAILURE':
      return Object.assign({}, state, {isFetching: false });

    case 'UNASSIGN_APPLICANT_TO_COURSE':
      return Object.assign({}, state, {isFetching: true });

    case 'UNASSIGN_APPLICANT_TO_COURSE_SUCCESS': {
      const index = getIndex(action.applicant, state.applicants, 'utorid');
      const courseArray = state.applicants[index].currentassignedcourses;
      const courseIndex = getIndex(action.course, courseArray, 'course');
      const newApplicants = state.applicants;
      const newAssignedCourses =
        [...newApplicants[index].currentassignedcourses.slice(0, courseIndex),
          ...newApplicants[index].currentassignedcourses.slice(courseIndex + 1)];
      newApplicants[index].currentassignedcourses = newAssignedCourses;
      return Object.assign({}, state, {isFetching: false, applicants: newApplicants});
    }

    case 'UNASSIGN_APPLICANT_TO_COURSE_FAILURE':
      return Object.assign({}, state, {isFetching: false });


    default:
      return state;
  }
}
