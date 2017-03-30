import React from 'react';
import lodash from 'lodash';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';

import CourseView from '../../components/course/courseview/CourseView.jsx';
import CourseList from './CourseList.jsx';
import * as courseActions from '../../actions/course/courseActions';



class Course extends React.Component {

  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.loadCourses([]);
  }

  render() {

    const styles = lodash.cloneDeep(this.constructor.styles);
    return (
      <div className="row" style={Course.styles.dashboard}>
        <div className="col-md-4 col-xs-12" style={Course.styles.courseList}>
          <Scrollbars style={{ height: '100%' }}
                      autoHide
                      autoHideTimeout={500}
                      autoHideDuration={200}>
            <CourseList courses={this.props.course.courses} full={this.props.course.full} loadCourses={this.props.loadCourses}/>
          </Scrollbars>
        </div>
        <div style={styles.course} className="col-xs-12 col-md-8">
          <Scrollbars style={{ height: '100%' }}
                      autoHide
                      autoHideTimeout={500}
                      autoHideDuration={200}>
            <CourseView selected={ this.props.course.selectedCourse }/>
          </Scrollbars>
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
    height: '100%',
    background: '#fafafa'
  },
  courseList: {
    padding: '0',
    height: '100%',
    background: 'rgb(189, 189, 189)'
  }

};

const mapStateToProps = (state, ownProps) => {
  return {
    course: state.course
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadCourses: (curr) => dispatch(courseActions.loadCourses(curr)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Course);
