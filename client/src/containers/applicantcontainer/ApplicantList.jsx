import React from 'react';
import lodash from 'lodash';
import autobind from 'react-autobind'
import ApplicantListSingle from '../../components/applicant/applicantlist/ApplicantListSingle';

import { connect } from 'react-redux';
import * as applicantActions from '../../actions/applicant/applicantActions';
import TextField from 'material-ui/TextField';

class ApplicantList extends React.Component {

  constructor(props){
    super(props);
    autobind(this);
    this.state = {
      filter: ''
    };
  }

  onSearch(e){
    this.setState({filter: e.target.value});
  }

  render() {
    const styles = lodash.cloneDeep(this.constructor.styles);

    // key property should be replaced with unique key retrieved by applicant database.

    const applicants = this.props.applicants
      .filter((applicant) => {
        return (
          applicant.program.toLowerCase().includes(this.state.filter.toLowerCase()) ||
          applicant.utorid.toLowerCase().includes(this.state.filter.toLowerCase()) ||
          applicant.studentnumber.toString().includes(this.state.filter.toLowerCase()) ||
          applicant.studentdepartment.toLowerCase().includes(this.state.filter.toLowerCase())
        )
      })
      .map((applicant, index) =>
        <ApplicantListSingle select={this.props.selectApplicant.bind(this, applicant)}
                          key={index}
                          applicantData={applicant}/>
      );

    return (
      <div style={ApplicantList.styles.applicantList}>
        <div className="text-center" style={styles.searchBackground}>
          <i className="material-icons" style={styles.searchIcon}>search</i>
          <TextField
            style={styles.search}
            inputStyle={styles.input}
            hintStyle={styles.hintStyle}
            underlineStyle={styles.underlineStyle}
            underlineFocusStyle={styles.focuslineStyle}
            onChange={this.onSearch}
            hintText="Search"/>
        </div>
        { applicants }
        <div className="applicantMore" style={styles.applicantMore}>
          <p style={styles.applicantMoreP}> more applicants </p>
        </div>
      </div>
    );
  }
}

ApplicantList.styles = {
  searchIcon: {
    verticalAlign: 'middle',
    color: 'rgba(255, 255, 255, 0.9)',
    marginRight: '5px'
  },
  applicantList: {
    flex: 1,
    flexDirection: 'column',
    height: '100%'
  },
  searchBackground: {
    background: '#777'
  },
  underlineStyle: {
    borderWidth: '2px',
    borderColor: '#777'
  },
  focuslineStyle: {
    borderColor: 'rgba(255, 255, 255, 0.9)'
  },
  hintStyle: {
    color: 'rgba(255, 255, 255, 0.9)'
  },
  search: {
    width: '85%',
  },
  input: {
    color: 'rgba(255, 255, 255, 0.9)'
  },
  applicantMore: {
    cursor: 'pointer',
    background: 'rgb(119, 119, 119)',
    textAlign: 'center',
    padding: '15px'
  },
  applicantMoreP: {
    color: '#FFF',
    margin: '0'
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    applicant: state.applicant
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectApplicant: applicant => dispatch(applicantActions.selectApplicant(applicant))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplicantList);
