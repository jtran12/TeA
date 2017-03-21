import React from 'react';
import lodash from 'lodash';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';

import CourseView from '../../components/course/courseview/CourseView.jsx';
import CourseList from './CourseList.jsx';
import * as courseActions from '../../actions/course/courseActions';



class Course extends React.Component {

  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.loadCourses();
  }

  render() {

    const styles = lodash.cloneDeep(this.constructor.styles);
    return (
      <div className="row" style={Course.styles.dashboard}>
        <div className="col-md-4 col-xs-12" style={Course.styles.courseList}>
          <CourseList courses={this.props.course.courses}/>
        </div>
        <div style={styles.course} className="col-xs-12 col-md-8">
          <CourseView selected={ this.props.course.selectedCourse }/>
        </div>
      </div>
    );
  }
}

Course.styles = {
  dashboard: {
    height: '100%'
  },
  course:{
    height: '100%'
  },
  idwidth: {
    width: '20%'
  },
  sessionwidth:{
    width: '20%'
  },
  actionwidth:{
    width: '18%'
  },
  courseList: {
    padding: '0',
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
    loadCourses: () => dispatch(courseActions.loadCourses()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Course);
