const SELECT_COURSE = 'SELECT_COURSE';
const DESELECT_COURSE = 'DESELECT_COURSE';

export function selectCourse(course) {
  return {
    type: SELECT_COURSE,
    course
  };
}

export function deselectCourse() {
  return {
    type: DESELECT_COURSE
  };
}
