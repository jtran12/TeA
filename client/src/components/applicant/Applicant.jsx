import React from 'react';
import lodash from 'lodash';

import Paper from 'material-ui/Paper';

import ApplicantView from './ApplicantView.jsx';
import ApplicantList from './ApplicantList.jsx'

class Applicant extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      selectedCourse: {}
    };
  }

  render() {
    const styles = lodash.cloneDeep(this.constructor.styles);

    return (
      <div className="row">
        <Paper className="col-md-4 col-xs-12" style={Applicant.styles.applicantList}>
            <ApplicantList/>
        </Paper>
        <Paper style={styles.applicant} zDepth={3} className="col-xs-12 col-md-8">
            <ApplicantView/>
        </Paper>
      </div>
    );
  }
}

Applicant.styles = {
  applicant:{
    margin: '0% 0% 2% 0'
  },
  card: {
    margin: '2% 0 2% 0'
  },
  applicantList: {
    padding: '0'
  }

};

export default Applicant;
