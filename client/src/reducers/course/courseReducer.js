import { createInitialCourseState } from '../../state/course/courseState';

export default function courseReducer(state = createInitialCourseState(), action) {

  switch (action.type) {

    case 'SELECT_COURSE':
      return Object.assign({}, state, {selectedCourse: action.course });

    case 'DESELECT_COURSE':
      return Object.assign({}, state, {selectedCourse: null });

    default:
      return state;
  }
}
