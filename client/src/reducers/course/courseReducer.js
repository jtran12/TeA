import createInitialCourseState from '../../state/course/courseState';

function getIndex(value, arr, prop) {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i][prop] === value) {
      return i;
    }
  }
  return -1;
}

export default function courseReducer(state = createInitialCourseState(), action) {

  switch (action.type) {

    case 'SELECT_COURSE':
      return Object.assign({}, state, {selectedCourse: action.course });

    case 'DESELECT_COURSE':
      return Object.assign({}, state, {selectedCourse: null });

    case 'LOAD_COURSES_REQUEST':
      return Object.assign({}, state, {isFetching: true });

    case 'LOAD_COURSES_SUCCESS':
      return Object.assign({}, state, {
        isFetching: false, courses: action.courses.data, full: action.courses.full
      });

    case 'LOAD_COURSES_FAILURE':
      return Object.assign({}, state, {isFetching: false });

    case 'ASSIGN_COURSE_TO_APPLICANT':
      return Object.assign({}, state, {isFetching: true });

    case 'ASSIGN_COURSE_TO_APPLICANT_SUCCESS':
      return Object.assign({}, state, {isFetching: false });

    case 'ASSIGN_COURSE_TO_APPLICANT_FAILURE':
      return Object.assign({}, state, {isFetching: false });

    case 'UNASSIGN_COURSE_TO_APPLICANT':
      return Object.assign({}, state, {isFetching: true });

    case 'UNASSIGN_COURSE_TO_APPLICANT_SUCCESS': {
      const index = getIndex(action.course, state.courses, 'course');
      const applicantArray = state.courses[index].tas;
      const applicantIndex = getIndex(action.applicant, applicantArray, 'utorid');
      const newCourse = state.courses;
      const newAssignedApplicants =
        [...newCourse[index].tas.slice(0, applicantIndex),
          ...newCourse[index].tas.slice(applicantIndex + 1)];
      newCourse[index].tas = newAssignedApplicants;
      return Object.assign({}, state, {isFetching: false, courses: newCourse});
    }

    case 'UNASSIGN_COURSE_TO_APPLICANT_FAILURE':
      return Object.assign({}, state, {isFetching: false });

    default:
      return state;
  }
}
