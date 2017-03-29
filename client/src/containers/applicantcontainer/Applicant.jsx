import React from 'react';
import lodash from 'lodash';

import Paper from 'material-ui/Paper';

import ApplicantView from '../../components/applicant/applicantview/ApplicantView.jsx';
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
      <div className="row" style={Applicant.styles.dashboard}>
        <div className="col-md-4 col-xs-12" style={Applicant.styles.applicantList}>
          <Scrollbars style={{ height: '100%' }}
                      autoHide
                      autoHideTimeout={500}
                      autoHideDuration={200}>
            <ApplicantList applicants={this.props.applicant.applicants}/>
          </Scrollbars>
        </div>
        <div style={styles.applicant} className="col-xs-12 col-md-8">
          <Scrollbars style={{ height: '100%' }}
                      autoHide
                      autoHideTimeout={500}
                      autoHideDuration={200}>
            <ApplicantView selected={ this.props.applicant.selectedApplicant }/>
          </Scrollbars>
        </div>
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
