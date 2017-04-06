import React from 'react';
import lodash from 'lodash';

import {Table, TableHeader, TableHeaderColumn, TableBody, TableRow, TableRowColumn} from 'material-ui/Table'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
import Dialog from 'material-ui/Dialog';

import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import * as applicantActions from '../../../actions/applicant/applicantActions';

import AddIcon from 'material-ui/svg-icons/content/add';
import RemoveIcon from 'material-ui/svg-icons/content/clear';
import CourseCoordinatorIcon from 'material-ui/svg-icons/social/person-outline';



class ApplicantTable extends React.Component {

  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.loadApplicants(this.props.applicant.applicants);
  }

  render() {
    const styles = lodash.cloneDeep(this.constructor.styles);
    const applicants = this.props.applicant.applicants;

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
                        <RaisedButton primary={true} icon={<AddIcon/>}/>
                      </TableRowColumn>
                    </TableRow>
                  ))
               }
              </TableBody>
          </Table>
          </Scrollbars>
      </div>
    );
  }
}

ApplicantTable.styles = {

};

const mapStateToProps = (state, ownProps) => {
  return {
    applicant: state.applicant
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadApplicants: (curr) => dispatch(applicantActions.loadApplicants(curr)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplicantTable);

