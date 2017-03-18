import React from 'react';
import lodash from 'lodash';
import Radium from 'radium';


@Radium
class ApplicantRecommendations extends React.Component {

  constructor(props){
    super(props);

    this.state = {

    };
  }



  render() {
    const styles = lodash.cloneDeep(this.constructor.styles);

    return (
      <div className="recommendations">

        <h3> Recommended </h3>


      </div>
    );
  }
}

ApplicantRecommendations.styles = {

};

export default ApplicantRecommendations;
