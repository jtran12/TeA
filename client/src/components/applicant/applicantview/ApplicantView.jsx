import React from 'react';
import lodash from 'lodash';

import {Table, TableHeader, TableHeaderColumn, TableBody, TableRow, TableRowColumn} from 'material-ui/Table'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
import Dialog from 'material-ui/Dialog';

import AddIcon from 'material-ui/svg-icons/content/add';
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
            <h2 style={styles.headerH2}>{applicant.familyname} {applicant.givenname} &nbsp;
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
          <div className="row text-center">
            <RaisedButton primary={true} label="Assign to Course" onClick={this.onOpenAssignDialog}/>
          </div>
          <Card style={styles.card}>
            <CardHeader
              title="Preferred Courses"
              actAsExpander={true}
              showExpandableButton={true} />
            <CardText expandable={true}>
              <Table fixedHeader={true}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                  <TableRow>
                    <TableHeaderColumn style={styles.idwidth}>ID</TableHeaderColumn>
                    <TableHeaderColumn>Professor</TableHeaderColumn>
                    <TableHeaderColumn>Previously Assigned</TableHeaderColumn>
                    <TableHeaderColumn>Course Coordinator Preferred</TableHeaderColumn>
                    <TableHeaderColumn />
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false} showRowHover={true} stripedRows={true}>
                  <TableRow selectable={false}>
                    <TableRowColumn style={styles.idwidth}>CSC302</TableRowColumn>
                    <TableRowColumn>Professor Teacherson</TableRowColumn>
                    <TableRowColumn>True</TableRowColumn>
                    <TableRowColumn>False</TableRowColumn>
                    <TableRowColumn>
                      <RaisedButton primary={true} icon={<AddIcon/>}/>
                    </TableRowColumn>
                  </TableRow>
                </TableBody>
              </Table>
            </CardText>
          </Card>
          <Card style={styles.card}>
            <CardHeader
              title="Assigned Courses"
              actAsExpander={true}
              showExpandableButton={true} />
            <CardText expandable={true}>
              <Table fixedHeader={true}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                  <TableRow>
                    <TableHeaderColumn style={styles.idwidth}>ID</TableHeaderColumn>
                    <TableHeaderColumn>Professor</TableHeaderColumn>
                    <TableHeaderColumn>Previously Assigned</TableHeaderColumn>
                    <TableHeaderColumn>Course Coordinator Preferred</TableHeaderColumn>
                    <TableHeaderColumn />
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false} showRowHover={true} stripedRows={true}>
                  <TableRow selectable={false}>
                    <TableRowColumn style={styles.idwidth}>CSC302</TableRowColumn>
                    <TableRowColumn>Professor Teacherson</TableRowColumn>
                    <TableRowColumn>True</TableRowColumn>
                    <TableRowColumn>False</TableRowColumn>
                    <TableRowColumn>
                      <RaisedButton secondary={true} icon={<RemoveIcon/>}/>
                    </TableRowColumn>
                  </TableRow>
                </TableBody>
              </Table>
            </CardText>
          </Card>
          <Card style={styles.card}>
            <CardHeader
              title="Past Assignments"
              actAsExpander={true}
              showExpandableButton={true} />
            <CardText expandable={true}>
              <Table fixedHeader={true}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                  <TableRow>
                    <TableHeaderColumn style={styles.idwidth}>ID</TableHeaderColumn>
                    <TableHeaderColumn>Semester</TableHeaderColumn>
                    <TableHeaderColumn>Professor</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false} showRowHover={true} stripedRows={true}>
                  <TableRow selectable={false}>
                    <TableRowColumn style={styles.idwidth}>CSC302</TableRowColumn>
                    <TableRowColumn>2017 - Spring</TableRowColumn>
                    <TableRowColumn>Professor Teacherson</TableRowColumn>
                  </TableRow>
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
  }
};

export default ApplicantView;
