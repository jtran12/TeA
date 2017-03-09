import React from 'react';
import lodash from 'lodash';

class CourseList extends React.Component {

  constructor(props){
    super(props);

    this.state = {
    };
  }

  render() {
    const styles = lodash.cloneDeep(this.constructor.styles);

    return (
      <div>
        <h3>Course List</h3>
      </div>
    );
  }
}

CourseList.styles = {

};

export default CourseList;
