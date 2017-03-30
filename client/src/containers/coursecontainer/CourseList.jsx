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
  onLoadMore(){
    this.props.loadCourses(this.props.courses.length);
  }

  render() {
    const styles = lodash.cloneDeep(this.constructor.styles);

    // key property should be replaced with unique key retrieved by course database.

    const courses = this.props.courses
      .filter((course) => course.course.toLowerCase().includes(this.state.filter.toLowerCase()))
      .map((course, index) =>
        <CourseListSingle select={this.props.selectCourse.bind(this, course)}
                          key={index}
                          courseData={course}/>
      );

    return (
      <div style={CourseList.styles.courseList}>
        <div className="text-center" style={styles.searchBackground}>
          <i className="material-icons" style={styles.searchIcon}>search</i>
            <TextField
            style={styles.search}
            inputStyle={styles.input}
            hintStyle={styles.hintStyle}
            underlineStyle={styles.underlineStyle}
            underlineFocusStyle={styles.focuslineStyle}
            onChange={this.onSearch}
            hintText="Search"/>
        </div>
        { courses }
        <div className="courseMore" style={styles.courseMore}>
          <p style={styles.courseMoreP} onClick={this.onLoadMore}> more courses </p>
        </div>
      </div>
    );
  }
}

CourseList.styles = {
  searchIcon: {
    verticalAlign: 'middle',
    color: 'rgba(255, 255, 255, 0.9)',
    marginRight: '5px'
  },
  courseList: {
    flex: 1,
    flexDirection: 'column',
    height: '100%'
  },
  searchBackground: {
    background: '#777'
  },
  underlineStyle: {
    borderWidth: '2px',
    borderColor: '#777'
  },
  focuslineStyle: {
    borderColor: 'rgba(255, 255, 255, 0.9)'
  },
  hintStyle: {
    color: 'rgba(255, 255, 255, 0.9)'
  },
  search: {
    width: '85%',
  },
  input: {
    color: 'rgba(255, 255, 255, 0.9)'
  },
  courseMore: {
    cursor: 'pointer',
    background: 'rgb(119, 119, 119)',
    textAlign: 'center',
    padding: '15px'
  },
  courseMoreP: {
    color: '#FFF',
    margin: '0'
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
