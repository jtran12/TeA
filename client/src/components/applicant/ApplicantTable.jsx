import React from 'react';
import lodash from 'lodash';

class ApplicantTable extends React.Component {

  constructor(props){
    super(props);

    this.state = {
    };
  }

  render() {
    const styles = lodash.cloneDeep(this.constructor.styles);

    return (
      <div>
        <h3>Applicant Table</h3>
      </div>
    );
  }
}

ApplicantTable.styles = {

};

export default ApplicantTable;
