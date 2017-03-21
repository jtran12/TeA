import React from 'react';
import lodash from 'lodash';
import autobind from 'react-autobind'
import CourseListSingle from '../../components/course/courselist/CourseListSingle';

import { connect } from 'react-redux';
import * as courseActions from '../../actions/course/courseActions';

import TextField from 'material-ui/TextField';

class CourseList extends React.Component {

  constructor(props){
    super(props);
    autobind(this);
    this.state = {
      filter: ''
    };
  }

  onSearch(e){
    this.setState({filter: e.target.value}, () => console.log(this.state.filter));
  }

  render() {
    const styles = lodash.cloneDeep(this.constructor.styles);

    // key property should be replaced with unique key retrieved by course database.

    const courses = this.props.courses
      .filter((course) => course.name.toLowerCase().includes(this.state.filter.toLowerCase()))
      .map((course, index) =>
        <CourseListSingle select={this.props.selectCourse.bind(this, course)}
                          key={index}
                          courseData={course}/>
      );

    return (
      <div style={CourseList.styles.courseList}>
        <div className="text-center">
          <TextField
            onChange={this.onSearch}
            floatingLabelText="Search"/>
        </div>
        <br />
        { courses }
      </div>
    );
  }
}

CourseList.styles = {
  courseList: {
    flex: 1,
    flexDirection: 'column',
    overflow: 'auto',
    height: '100%'
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
