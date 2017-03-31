import CourseAPI from '../../api/course/courseAPI';

const SELECT_COURSE = 'SELECT_COURSE';
const DESELECT_COURSE = 'DESELECT_COURSE';
const LOAD_COURSES_REQUEST = 'LOAD_COURSES_REQUEST';
const LOAD_COURSES_SUCCESS = 'LOAD_COURSES_SUCCESS';
const LOAD_COURSES_FAILURE = 'LOAD_COURSES_FAILURE';

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

export function loadCoursesRequest() {
  return {
    type: LOAD_COURSES_REQUEST,
    isFetching: true
  };
}

export function loadCoursesSuccess(courses) {
  return {
    type: LOAD_COURSES_SUCCESS,
    isFetching: false,
    courses
  };
}

export function loadCoursesFailure(error) {
  return {
    type: LOAD_COURSES_FAILURE,
    isFetching: false,
    error
  };
}

export function loadCourses(curr) {
  return (dispatch) => {
    dispatch(loadCoursesRequest());
    return CourseAPI.getCourses(curr.length).then((courses) => {
      /* eslint-disable no-param-reassign */
      courses.full = courses.data.length === 0;
      courses.data = curr.concat(courses.data);
      /* eslint-enable no-param-reassign */
      dispatch(loadCoursesSuccess(courses));
    }).catch((error) => {
      dispatch(loadCoursesFailure(error));
    });
  };
}
