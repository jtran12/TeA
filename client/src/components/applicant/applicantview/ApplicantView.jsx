import React from 'react';
import lodash from 'lodash';
import autobind from 'react-autobind';

import {Table, TableHeader, TableHeaderColumn, TableBody, TableRow, TableRowColumn} from 'material-ui/Table'
import {Card, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

import RemoveIcon from 'material-ui/svg-icons/content/clear';
import CourseTable from '../../course/coursetable/CourseTable.jsx';

class ApplicantView extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      showAssignDialog: false
    };

    this.onOpenAssignDialog = this.onOpenAssignDialog.bind(this);
    this.onCloseAssignDialog = this.onCloseAssignDialog.bind(this);
  }

  onOpenAssignDialog(){
    this.setState({showAssignDialog: true});
  }
  onCloseAssignDialog(){
    this.setState({showAssignDialog: false});
  }

  render() {
    const styles = lodash.cloneDeep(this.constructor.styles);
    const applicant = this.props.selected;

    if(applicant !== null) {
      return (
        <div style={styles.noScrollX}>
          <div className="page-header">
            <h2 style={styles.headerH2}>{applicant.givenname} {applicant.familyname} &nbsp;
              <small>{applicant.studentdepartment}</small>
            </h2>
            <Table fixedHeader={true}>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn style={styles.idwidth}>Utorid</TableHeaderColumn>
                  <TableHeaderColumn>Student Number</TableHeaderColumn>
                  <TableHeaderColumn>Program</TableHeaderColumn>
                  <TableHeaderColumn>Program Year</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                <TableRow selectable={false}>
                  <TableRowColumn style={styles.idwidth}>{applicant.utorid}</TableRowColumn>
                  <TableRowColumn>{applicant.studentnumber}</TableRowColumn>
                  <TableRowColumn>{applicant.program.toUpperCase()}</TableRowColumn>
                  <TableRowColumn>{applicant.year}</TableRowColumn>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          {
            this.props.applicant ? null :
              <div className="row text-center">
                <RaisedButton primary={true} label="Assign to Course" onClick={this.onOpenAssignDialog}/>
              </div>
          }

          <Card style={styles.card}>
            <CardHeader
              title="Assigned Courses"
              actAsExpander={true}
              showExpandableButton={true} />
            <CardText expandable={true}>
              <Table fixedHeader={true}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                  <TableRow>
                    <TableHeaderColumn style={styles.idwidth}>Course</TableHeaderColumn>
                    <TableHeaderColumn>Head Instructor</TableHeaderColumn>
                    <TableHeaderColumn>Current TAs</TableHeaderColumn>
                    <TableHeaderColumn>Max TAs</TableHeaderColumn>
                    <TableHeaderColumn />
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false} showRowHover={false} stripedRows={false}>
                {
                  applicant.currentassignedcourses.length > 0 ?
                  applicant.currentassignedcourses.map((course, index) => {
                    return <TableRow selectable={false} key={index}>
                        <TableRowColumn style={styles.idwidth}>{course.course}</TableRowColumn>
                        <TableRowColumn>{course.head_instructor}</TableRowColumn>
                      <TableRowColumn>{course.currentta}</TableRowColumn>
                      <TableRowColumn>{course.maxta}</TableRowColumn>
                        <TableRowColumn>
                          <RaisedButton onClick={() => this.props.unassign(course.course, applicant.utorid)}
                                        secondary={true} icon={<RemoveIcon/>}/>
                        </TableRowColumn>
                      </TableRow>
                  })
                    :
                    <TableRow selectable={false}>
                    <TableRowColumn style={styles.notassigned}>I'm not assigned to any courses yet!</TableRowColumn>
                    </TableRow>
                }
                </TableBody>
              </Table>
            </CardText>
          </Card>

          <Dialog
            open={this.state.showAssignDialog}
            autoDetectWindowHeight={true}
            onRequestClose={this.onCloseAssignDialog}>
            <CourseTable />
          </Dialog>
        </div>
      );
    }

    else {
      return (
        <div className="text-center">
          <h2 style={styles.notSelected}>No applicant selected</h2>
        </div>
      );
    }
  }
}

ApplicantView.styles = {
  card: {
    margin: '2% 0 2% 0'
  },
  progress: {
    margin:'1% 0 1% 0'
  },
  noScrollX: {
    overflowX: 'hidden'
  },
  notSelected: {
    margin: '10% 0'
  },
  notassigned: {
    padding: "15px",
    marginBottom: "0",
    color: "#DE3E3E"
  }
};

export default ApplicantView;
