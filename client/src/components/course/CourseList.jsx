import React from 'react';
import lodash from 'lodash';

class CourseList extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      courses: [
        {
          courseCode: "CSC108"
        },
        {
          courseCode: "CSC148"
        },
        {
          courseCode: "CSC165"
        }
      ]
    };
  }

  render() {
    const styles = lodash.cloneDeep(this.constructor.styles);

    const courses = this.state.courses.map((course) => <div> { course.courseCode } </div> );

    return (
      <div>
        {courses}
      </div>
    );
  }
}

CourseList.styles = {

};

export default CourseList;
