import React from 'react';
import lodash from 'lodash';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';

import ApplicantView from '../../components/applicant/applicantview/ApplicantView.jsx';
import ApplicantList from './ApplicantList.jsx'
import * as applicantActions from '../../actions/applicant/applicantActions';

class Applicant extends React.Component {

  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.loadApplicants([]);
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
            <ApplicantList applicants={this.props.applicant.applicants}
                           full={this.props.applicant.full}
                           loadApplicants={this.props.loadApplicants}
            />
          </Scrollbars>
        </div>
        <div style={styles.applicant} className="col-xs-12 col-md-8">
          <Scrollbars style={{ height: '100%' }}
                      autoHide
                      autoHideTimeout={500}
                      autoHideDuration={200}>
            <ApplicantView unassign={this.props.unassignApplicant}
                           selected={ this.props.applicant.selectedApplicant }/>
          </Scrollbars>
        </div>
      </div>
    );
  }
}

Applicant.styles = {
  dashboard: {
    height: '100%'
  },
  applicant:{
    height: '100%',
    background: '#fafafa'
  },
  idwidth: {
    width: '20%'
  },
  sessionwidth:{
    width: '20%'
  },
  actionwidth:{
    width: '18%'
  },
  applicantList: {
    padding: '0',
    height: '100%',
    background: 'rgb(189, 189, 189)'
  }

};

const mapStateToProps = (state, ownProps) => {
  return {
    applicant: state.applicant
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadApplicants: (curr) => dispatch(applicantActions.loadApplicants(curr)),
    unassignApplicant: (course, applicantID) => dispatch(applicantActions.unassignApplicant(course, applicantID))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Applicant);
