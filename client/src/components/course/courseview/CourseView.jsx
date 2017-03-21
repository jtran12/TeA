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


  render() {
    const styles = lodash.cloneDeep(this.constructor.styles);

    // A course must be selected, otherwise display a get clicking menu
    if(this.props.selected !== null) {
      return (
        <div>
          <div className="page-header">
            <h2>{ this.props.selected.name } <small>Spring 2017 - St. George</small></h2>
          </div>
          <div className="row text-center">
            <p>{this.props.selected.currentTAs}/{this.props.selected.maxTAs} Assigned Positions</p>
            <LinearProgress style={styles.progress}
                            mode="determinate"
                            max={this.props.selected.maxTAs}
                            value={this.props.selected.currentTAs} />
            <RaisedButton primary={true} label="Assign Applicants" onClick={this.onOpenAssignDialog}/>
          </div>
          <Card style={styles.card}>
            <CardHeader
              title="Instructors"
              actAsExpander={true}
              showExpandableButton={true} />
            <CardText expandable={true}>
              <List>
                <ListItem primaryText="Professor Prefessorson" rightIcon={<CourseCoordinatorIcon />}/>
                <ListItem primaryText="Lecture Name"/>
                <ListItem primaryText="Another Instructor"/>
              </List>
            </CardText>
          </Card>
          <Card style={styles.card}>
            <CardHeader
              title="Course Coordinator Note"
              actAsExpander={true}
              showExpandableButton={true} />
            <CardText expandable={true}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
              Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
              Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
            </CardText>
            <CardActions>
              <FlatButton primary={true} label="Respond" />
            </CardActions>
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
          <h2>No course selected</h2>
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
  }
};

export default CourseView;
