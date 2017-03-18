export function selectCourse(course) {
  return {
    type: 'SELECT_COURSE',
    course: course
  }
};

export function deselectCourse() {
  return {
    type: 'DESELECT_COURSE'
  }
};
