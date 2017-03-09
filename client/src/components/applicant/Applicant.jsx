import React from 'react';
import lodash from 'lodash';

class Applicant extends React.Component {

  constructor(props){
    super(props);

    this.state = {
    };
  }

  render() {
    const styles = lodash.cloneDeep(this.constructor.styles);

    return (
      <div>
        <h3>Applicant</h3>
      </div>
    );
  }
}

Applicant.styles = {

};

export default Applicant;
