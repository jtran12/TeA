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
import * as courseActions from '../../../actions/course/courseActions';

import AddIcon from 'material-ui/svg-icons/content/add';
import RemoveIcon from 'material-ui/svg-icons/content/clear';
import CourseCoordinatorIcon from 'material-ui/svg-icons/social/person-outline';

class CourseTable extends React.Component {

  constructor(props){
    super(props);

  }

  componentDidMount() {
    this.props.loadCourses([]);
  }


  render() {
    const styles = lodash.cloneDeep(this.constructor.styles);
    const courses = this.props.courses.courses;

    return (
      <div>
        <h3>Courses</h3>
        <Scrollbars style={{ width: 700, height: 400 }}>
          <Table fixedHeader={false}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false} sortable={true}>
              <TableRow>
                <TableHeaderColumn style={styles.idwidth}>Course Code</TableHeaderColumn>
                <TableHeaderColumn>Head Instructor</TableHeaderColumn>
                <TableHeaderColumn>Max number of TAs</TableHeaderColumn>
                <TableHeaderColumn>Current number of TAs assigned</TableHeaderColumn>
                <TableHeaderColumn />
              </TableRow>
            </TableHeader>
            {/* The table headers should allow sortable which will be included in a function later */}
            
              <TableBody displayRowCheckbox={false} showRowHover={true} stripedRows={false}>
               {
                  courses.map((course, index) =>  (
                    <TableRow selectable={false} key={index}>
                      <TableRowColumn style={styles.idwidth} >{course.course}</TableRowColumn>
                      <TableRowColumn style={styles.idwidth} >{course.head_instructor}</TableRowColumn>
                      <TableRowColumn style={styles.idwidth} >{course.maxta}</TableRowColumn>
                      <TableRowColumn style={styles.idwidth} >{course.currentta}</TableRowColumn>
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

CourseTable.styles = {

};

const mapStateToProps = (state, ownProps) => {
  return {
    courses: state.course
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadCourses: (curr) => dispatch(courseActions.loadCourses(curr))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseTable);