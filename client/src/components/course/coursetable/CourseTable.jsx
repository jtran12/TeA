import React from 'react';
import lodash from 'lodash';

class CourseTable extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    const styles = lodash.cloneDeep(this.constructor.styles);

    return (
      <div>
        <h3>Course Table</h3>
      </div>
    );
  }
}

CourseTable.styles = {
};

export default CourseTable;
