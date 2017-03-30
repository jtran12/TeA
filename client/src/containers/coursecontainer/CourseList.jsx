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
    this.setState({filter: e.target.value});
  }

  isNum(char) {
    if(isNaN(char)) {
      return false;
    }
    return true;
  }

  percentageMode(char) {
    if(char === "%") {
      return true;
    }
    return false;
  }

  numTAParser(filter) {
    let search = filter.split();

    // Determine if first char in command is an operator
    if(search[0] === "<" && search.length > 1) {
      if(this.percentageMode(search[1]) && search.length > 2 && this.isNum(search.slice(2,))) {
        return {"operator": "LESS_THAN", "mode": "percent", "filterNum": parseInt(search.slice(2,))}
      }
      if(this.isNum(search.slice(1,))) {
        return {"operator": "LESS_THAN", "mode": "normal", "filterNum": parseInt(search.slice(1,))}
      }
    }

    else if(search[0] === ">" && search.length > 1) {
      if(this.percentageMode(search[1]) && search.length > 2 && this.isNum(search.slice(2,))) {
        return {"operator": "GREATER_THAN", "mode": "percent", "filterNum": parseInt(search.slice(2,))}
      }
      if(this.isNum(search.slice(1,))) {
        return {"operator": "GREATER_THAN", "mode": "normal", "filterNum": parseInt(search.slice(1,))}
      }
    }

    // Determine if first char is an operator if no space
    else if (filter[0] === "<" && filter.length > 1 ) {
      if(this.percentageMode(filter[1]) && filter.length > 2 && this.isNum(filter.substring(2,))) {

        return {"operator": "LESS_THAN", "mode": "percent", "filterNum": parseInt(filter.substring(2,))}
      }
      if(this.isNum(filter.substring(1,))) {
        return {"operator": "LESS_THAN", "mode": "normal", "filterNum": parseInt(filter.substring(1,))}
      }
    }

    else if (filter[0] === ">" && filter.length > 1 ) {
      if(this.percentageMode(filter[1]) && filter.length > 2 && this.isNum(filter.substring(2,))) {
        return {"operator": "GREATER_THAN", "mode": "percent", "filterNum": parseInt(filter.substring(2,))}
      }
      if(this.isNum(filter.substring(1,))) {
        return {"operator": "GREATER_THAN", "mode": "normal", "filterNum": parseInt(filter.substring(1,))}
      }
    }
    return false;
  }

  numTAsOperator(numTAs, maxTAs, filter) {
    let parse = this.numTAParser(filter);
    // If valid parse, get operator and perform on filterNum
    if(parse !== false) {
      // Less than
      if(parse.operator === "LESS_THAN") {
        if(parse.mode === "percent" && maxTAs !== 0) {
          return Math.ceil(((numTAs / maxTAs) * 100)) <= parseInt(parse.filterNum);
        }
        else if (parse.mode === "normal") {
          return numTAs <= parseInt(parse.filterNum);
        }
        return false;
      }
      // Greater than
      if(parse.operator === "GREATER_THAN") {
        if(parse.mode === "percent" && maxTAs !== 0) {
          return Math.ceil(((numTAs / maxTAs) * 100)) >= parseInt(parse.filterNum);
        }
        else if (parse.mode === "normal") {
          return numTAs >= parseInt(parse.filterNum);
        }
        return false;
      }
    }
    else {
      return false;
    }
  }

  render() {
    const styles = lodash.cloneDeep(this.constructor.styles);

    // key property should be replaced with unique key retrieved by course database.

    const courses = this.props.courses
      .filter((course) => {
        return (
          course.course.toLowerCase().includes(this.state.filter.toLowerCase()) ||
          this.numTAsOperator(course.currentta, course.maxta, this.state.filter)
        )
      })
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
          <p style={styles.courseMoreP}> more courses </p>
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
