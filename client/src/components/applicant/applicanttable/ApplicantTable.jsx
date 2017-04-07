import React from 'react';
import lodash from 'lodash';
import autobind from 'react-autobind';

import {Table, TableHeader, TableHeaderColumn, TableBody, TableRow, TableRowColumn} from 'material-ui/Table'
import RaisedButton from 'material-ui/RaisedButton';

import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import * as applicantActions from '../../../actions/applicant/applicantActions';

import AddIcon from 'material-ui/svg-icons/content/add';

class ApplicantTable extends React.Component {

  constructor(props){
    super(props);
    autobind(this);
  }

  componentDidMount() {
    this.props.loadApplicants(this.props.applicant.applicants);
  }

  onLoadMore() {
    this.props.loadApplicants(this.props.applicant.applicants);
  }
  getIndex(value, arr, prop) {
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i][prop] === value) {
        return i;
      }
    }
    return -1;
  }

  render() {
    const styles = lodash.cloneDeep(this.constructor.styles);
    const course = this.props.course.selectedCourse;
    const applicants = this.props.applicant.applicants.filter((applicant) => {
      return this.getIndex(course.course, applicant.currentassignedcourses, 'course') === -1
    });

    return (
      <div>
        <h3>Applicants</h3>
        <Scrollbars style={{ width: 700, height: 400 }}>
          <Table fixedHeader={false}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false} sortable={true}>
              <TableRow>
                <TableHeaderColumn style={styles.idwidth}>Utorid</TableHeaderColumn>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Enrollment Level</TableHeaderColumn>
                <TableHeaderColumn>Year</TableHeaderColumn>
                <TableHeaderColumn />
              </TableRow>
            </TableHeader>
            {/* The table headers should allow sortable which will be included in a function later */}

              <TableBody displayRowCheckbox={false} showRowHover={true} stripedRows={false}>
               {
                  applicants.map((applicant, index) =>  (
                    <TableRow selectable={false} key={index}>
                      <TableRowColumn style={styles.idwidth} >{applicant.utorid}</TableRowColumn>
                      <TableRowColumn>{applicant.familyname} {applicant.givenname}</TableRowColumn>
                      <TableRowColumn>{applicant.program.toUpperCase()}</TableRowColumn>
                      <TableRowColumn>{applicant.year}</TableRowColumn>
                      <TableRowColumn>
                        <RaisedButton onClick={() => this.props.assign(course, applicant)}
                                      primary={true} icon={<AddIcon/>}/>
                      </TableRowColumn>
                    </TableRow>
                  ))
               }
              </TableBody>
          </Table>
          {
            this.props.applicant.full ? null :
              this.props.applicant.isFetching ?
                <div className="applicantMore" style={styles.applicantMore}>
                  <p style={styles.applicantMoreP}> fetching... </p>
                </div>
                :
                <div className="applicantMore" style={styles.applicantMore}>
                  <p style={styles.applicantMoreP} onClick={this.onLoadMore}> more applicants </p>
                </div>
          }
          </Scrollbars>
      </div>
    );
  }
}

ApplicantTable.styles = {
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
    course: state.course,
    applicant: state.applicant
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadApplicants: (curr) => dispatch(applicantActions.loadApplicants(curr)),
    assign: (course, applicant) => dispatch(applicantActions.assignApplicant(course, applicant))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplicantTable);

