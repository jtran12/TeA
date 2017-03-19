import React from 'react';
import lodash from 'lodash';
import CourseListSingle from '../../components/course/courselist/CourseListSingle';

import { connect } from 'react-redux';
import * as courseActions from '../../actions/course/courseActions';

class CourseList extends React.Component {

  constructor(props){
    super(props);

  }

  render() {
    const styles = lodash.cloneDeep(this.constructor.styles);

    // key property should be replaced with unique key retrieved by course database.

    const courses = this.props.courses.map((course, index) =>
      <CourseListSingle select={this.props.selectCourse.bind(this, course)}
                        key={index}
                        courseData={course}/> );

    return (
      <div style={CourseList.styles.courseList}>
        { courses }
      </div>
    );
  }
}

CourseList.styles = {
  courseList: {
    flex: 1,
    flexDirection: 'column'
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    course: state.course
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectCourse: course => dispatch(courseActions.selectCourse(course))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseList);
