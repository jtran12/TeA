import React from 'react';
import lodash from 'lodash';

class Course extends React.Component {

  constructor(props){
    super(props);

    this.state = {
    };
  }

  render() {
    const styles = lodash.cloneDeep(this.constructor.styles);

    return (
      <div>
        <h3>Course</h3>
      </div>
    );
  }
}

Course.styles = {

};

export default Course;
