import React from 'react';
import lodash from 'lodash';

import {Table, TableHeader, TableHeaderColumn, TableBody, TableRow, TableRowColumn} from 'material-ui/Table'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
import Dialog from 'material-ui/Dialog';

import AddIcon from 'material-ui/svg-icons/content/add';
import RemoveIcon from 'material-ui/svg-icons/content/clear';
import CourseCoordinatorIcon from 'material-ui/svg-icons/social/person-outline';
import ApplicantTable from '../../applicant/applicanttable/ApplicantTable.jsx';
import ApplicantRecommendations from '../../applicant/applicantrecommendations/ApplicantRecommendations';

class CourseView extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      showAssignDialog: false,

      recommendedApplicants: [
        {
          id: '1001143223',
          firstName: 'David',
          lastName: 'Davis',
          studentLevel: 'Year 1 Graduate Student'
        },
        {
          id: '1054367243',
          firstName: 'Lisa',
          lastName: 'Elissa',
          studentLevel: 'Year 2 Undergraduate Student'
        },
        {
          id: '1436345454',
          firstName: 'Michael',
          lastName: 'Carmichael',
          studentLevel: 'Year 4 Undergraduate Student'
        },
        {
          id: '2445345454',
          firstName: 'Jenny',
          lastName: 'Janice',
          studentLevel: 'Year 1 Undergraduate Student'
        }
      ]

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

  getTerm(term) {
    switch(term) {
      case "F":
        return "Fall ";
      case "S":
        return "Spring ";
      default:
        return "NO TERM ";
    }
  }

  getAdditionalInstructors(instructors) {
    if(instructors !== null) {
      return instructors.map((instructor, index) =>
          <ListItem key={index} primaryText={instructor}/>
      )
    }
  }

  render() {
    const styles = lodash.cloneDeep(this.constructor.styles);
    const course = this.props.selected;

    // A course must be selected, otherwise display a get clicking menu
    if(course !== null) {
      return (
        <div style={styles.noScrollX}>
          <div className="page-header">
            <h2>{ course.coursecode.toUpperCase() }
              <small> { this.getTerm(course.term.toUpperCase()) }
              { course.year } - St. George
              </small>
            </h2>
          </div>
          <div className="row text-center">
            <p>
              {course.currentta === null ? 0 : course.currentta}
              /{course.maxta === null || course.maxta === 0 ? 1 : course.maxta}
              &nbsp;Assigned Positions
            </p>
            <LinearProgress style={styles.progress}
                            mode="determinate"
                            max={course.maxta}
                            value={course.currentta} />
            <RaisedButton primary={true} label="Assign Applicants" onClick={this.onOpenAssignDialog}/>
          </div>
          <Card style={styles.card}>
            <CardHeader
              title="Instructors"
              actAsExpander={true}
              showExpandableButton={true} />
            <CardText expandable={true}>
              <List>
                <ListItem primaryText={course.head_instructor} rightIcon={<CourseCoordinatorIcon />}/>
                { this.getAdditionalInstructors(course.additional_instructors) }
              </List>
            </CardText>
          </Card>
          <Card style={styles.card}>
            <CardHeader
              title="Recommended Applicants"
              actAsExpander={true}
              showExpandableButton={true} />
            <CardText expandable={true}>
              <ApplicantRecommendations/>
            </CardText>
          </Card>
          <Card style={styles.card}>
            <CardHeader
              title="Requested Applicants"
              actAsExpander={true}
              showExpandableButton={true} />
            <CardText expandable={true}>
              <Table fixedHeader={true}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                  <TableRow>
                    <TableHeaderColumn style={styles.idwidth}>ID</TableHeaderColumn>
                    <TableHeaderColumn>First Name</TableHeaderColumn>
                    <TableHeaderColumn>Last Name</TableHeaderColumn>
                    <TableHeaderColumn>Enrollment Level</TableHeaderColumn>
                    <TableHeaderColumn />
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false} showRowHover={true} stripedRows={true}>
                  <TableRow selectable={false}>
                    <TableRowColumn style={styles.idwidth}>1001143223</TableRowColumn>
                    <TableRowColumn>Test</TableRowColumn>
                    <TableRowColumn>User</TableRowColumn>
                    <TableRowColumn>UG - 2</TableRowColumn>
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
              title="Assigned Applicants"
              actAsExpander={true}
              showExpandableButton={true} />
            <CardText expandable={true}>
              <Table fixedHeader={true}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                  <TableRow>
                    <TableHeaderColumn style={styles.idwidth}>ID</TableHeaderColumn>
                    <TableHeaderColumn>First Name</TableHeaderColumn>
                    <TableHeaderColumn>Last Name</TableHeaderColumn>
                    <TableHeaderColumn>Enrollment Level</TableHeaderColumn>
                    <TableHeaderColumn style={styles.actionwidth}/>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false} showRowHover={true} stripedRows={true}>
                  <TableRow selectable={false}>
                    <TableRowColumn style={styles.idwidth}>1001143223</TableRowColumn>
                    <TableRowColumn>Test</TableRowColumn>
                    <TableRowColumn>User</TableRowColumn>
                    <TableRowColumn>UG - 2</TableRowColumn>
                    <TableRowColumn style={styles.actionwidth}>
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
                    <TableHeaderColumn>First Name</TableHeaderColumn>
                    <TableHeaderColumn>Last Name</TableHeaderColumn>
                    <TableHeaderColumn style={styles.sessionwidth}>Session</TableHeaderColumn>
                    <TableHeaderColumn>Is Applicant</TableHeaderColumn>
                    <TableHeaderColumn />
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false} showRowHover={true} stripedRows={true}>
                  <TableRow selectable={false}>
                    <TableRowColumn style={styles.idwidth}>1001143223</TableRowColumn>
                    <TableRowColumn>Test</TableRowColumn>
                    <TableRowColumn>User</TableRowColumn>
                    <TableRowColumn style={styles.sessionwidth}>2015 Spring</TableRowColumn>
                    <TableRowColumn>True</TableRowColumn>
                    <TableRowColumn>
                    </TableRowColumn>
                  </TableRow>
                </TableBody>
              </Table>
            </CardText>
          </Card>

          <Dialog
            open={this.state.showAssignDialog}
            autoDetectWindowHeight={true}
            onRequestClose={this.onCloseAssignDialog}>
            <ApplicantTable />
          </Dialog>
        </div>
      );
    }


    // Display default course view, user has not clicked any course.
    else {
      return (
        <div className="text-center">
          <h2 style={styles.notSelected}>No course selected</h2>
        </div>
      );
    }

  }
}

CourseView.styles = {
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

export default CourseView;
