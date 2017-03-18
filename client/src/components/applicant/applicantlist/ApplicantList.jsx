import React from 'react';
import lodash from 'lodash';

class ApplicantList extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    const styles = lodash.cloneDeep(this.constructor.styles);

    return (
      <div>
        <h3>Applicant List</h3>
      </div>
    );
  }
}

ApplicantList.styles = {
};

export default ApplicantList;
