import { createInitialCourseState } from '../../state/course/courseState'

export function courseReducer (state = createInitialCourseState, action) => {

  switch (action.type){

    case 'SELECT_COURSE':
      return [
        ...state,
        Object.assign({}, action.course)
      ]

    default:
      return state;
  }
}
