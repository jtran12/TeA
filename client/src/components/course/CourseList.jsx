import React from 'react';
import lodash from 'lodash';
import CourseListSingle from './CourseListSingle';

class CourseList extends React.Component {

  constructor(props){
    super(props);

    this.state = {

      // courses will be JSON retrieved from endpoint.
      courses: [
        {
          name: "CSC108",
          currentTAs: 12,
          maxTAs: 30
        },
        {
          name: "CSC148",
          currentTAs: 14,
          maxTAs: 20
        },
        {
          name: "CSC165",
          currentTAs: 9,
          maxTAs: 20
        },
        {
          name: "CSC209",
          currentTAs: 5,
          maxTAs: 10
        },
        {
          name: "CSC302",
          currentTAs: 3,
          maxTAs: 4
        },
        {
          name: "CSC373",
          currentTAs: 3,
          maxTAs: 5
        }
      ]
    };
  }

  render() {
    const styles = lodash.cloneDeep(this.constructor.styles);

    // key property should be replaced with unique key retrieved by course database.

    const courses = this.state.courses.map((course, index) =>
      <CourseListSingle key={index} course={course} select={this.props.select}/> );

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

export default CourseList;
