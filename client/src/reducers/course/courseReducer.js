import createInitialCourseState from '../../state/course/courseState';

export default function courseReducer(state = createInitialCourseState(), action) {

  switch (action.type) {

    case 'SELECT_COURSE':
      return Object.assign({}, state, {selectedCourse: action.course });

    case 'DESELECT_COURSE':
      return Object.assign({}, state, {selectedCourse: null });

    case 'LOAD_COURSES_REQUEST':
      return Object.assign({}, state, {isFetching: true });

    case 'LOAD_COURSES_SUCCESS':
      return Object.assign({}, state, {isFetching: false, courses: action.courses });

    case 'LOAD_COURSES_FAILURE':
      return Object.assign({}, state, {isFetching: false });

    default:
      return state;
  }
}
