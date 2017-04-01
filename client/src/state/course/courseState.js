export default function createInitialCourseState() {
  return {
    selectedCourse: null,
    isFetching: false,
    error: null,
    courses: [],
    full: false
  };
}
