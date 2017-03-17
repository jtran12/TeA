import { createInitialCourseState } from '../../state/course/courseState';

export default function courseReducer (state = createInitialCourseState(), action) {

  switch (action.type) {

    case 'SELECT_COURSE':
      return Object.assign({}, state, {selectedCourse: action.course });


    default:
      return state;
  }
}
