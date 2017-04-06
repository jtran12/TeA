import CourseAPI from '../../api/course/courseAPI';
import * as applicantActions from '../applicant/applicantActions';

const SELECT_COURSE = 'SELECT_COURSE';
const DESELECT_COURSE = 'DESELECT_COURSE';
const LOAD_COURSES_REQUEST = 'LOAD_COURSES_REQUEST';
const LOAD_COURSES_SUCCESS = 'LOAD_COURSES_SUCCESS';
const LOAD_COURSES_FAILURE = 'LOAD_COURSES_FAILURE';
const ASSIGN_COURSE_TO_APPLICANT = 'ASSIGN_COURSE_TO_APPLICANT';
const ASSIGN_COURSE_TO_APPLICANT_SUCCESS = 'ASSIGN_COURSE_TO_APPLICANT_SUCCESS';
const ASSIGN_COURSE_TO_APPLICANT_FAILURE = 'ASSIGN_COURSE_TO_APPLICANT_FAILURE';
const UNASSIGN_COURSE_TO_APPLICANT = 'UNASSIGN_COURSE_TO_APPLICANT';
const UNASSIGN_COURSE_TO_APPLICANT_SUCCESS = 'UNASSIGN_COURSE_TO_APPLICANT_SUCCESS';
const UNASSIGN_COURSE_TO_APPLICANT_FAILURE = 'UNASSIGN_COURSE_TO_APPLICANT_FAILURE';

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

export function assignCourseToApplicant() {
  return {
    type: ASSIGN_COURSE_TO_APPLICANT,
    isFetching: true,
  };
}

export function assignCourseToApplicantSuccess(course, applicant) {
  return {
    type: ASSIGN_COURSE_TO_APPLICANT_SUCCESS,
    isFetching: false,
    course,
    applicant
  };
}

export function assignCourseToApplicantFailure(error) {
  return {
    type: ASSIGN_COURSE_TO_APPLICANT_FAILURE,
    isFetching: false,
    error
  };
}

export function unassignCourseToApplicant() {
  return {
    type: UNASSIGN_COURSE_TO_APPLICANT,
    isFetching: true,
  };
}

export function unassignCourseToApplicantSuccess(course, applicant) {
  return {
    type: UNASSIGN_COURSE_TO_APPLICANT_SUCCESS,
    isFetching: false,
    course,
    applicant
  };
}

export function unassignCourseToApplicantFailure(error) {
  return {
    type: UNASSIGN_COURSE_TO_APPLICANT_FAILURE,
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

export function assignCourse(course, applicant) {
  return (dispatch) => {
    dispatch(assignCourseToApplicant());
    return CourseAPI.assignCourseToApplicant(course, applicant).then(() => {
      dispatch(assignCourseToApplicantSuccess(course, applicant));
      dispatch(applicantActions.assignApplicantToCourseSuccess(course, applicant));
    }).catch((error) => {
      dispatch(assignCourseToApplicantFailure(error));
    });
  };
}

export function unassignApplicant(course, applicantID) {
  return (dispatch) => {
    dispatch(unassignCourseToApplicant());
    return CourseAPI.unassignCourseToApplicant(course, applicantID).then(() => {
      dispatch(unassignCourseToApplicantSuccess(course, applicantID));
      dispatch(applicantActions.unassignApplicantToCourseSuccess(course, applicantID));
    }).catch((error) => {
      dispatch(unassignCourseToApplicantFailure(error));
    });
  };
}
