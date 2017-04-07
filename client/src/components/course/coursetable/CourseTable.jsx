import React from 'react';
import lodash from 'lodash';
import autobind from 'react-autobind';

import {Table, TableHeader, TableHeaderColumn, TableBody, TableRow, TableRowColumn} from 'material-ui/Table'
import RaisedButton from 'material-ui/RaisedButton';

import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import * as courseActions from '../../../actions/course/courseActions';

import AddIcon from 'material-ui/svg-icons/content/add';

class CourseTable extends React.Component {

  constructor(props){
    super(props);
    autobind(this);
  }

  componentDidMount() {
    this.props.loadCourses(this.props.courses.courses);
  }
  onLoadMore(){
    this.props.loadCourses(this.props.courses.courses);
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
          {
            this.props.courses.full ? null :
              this.props.courses.isFetching ?
                <div className="courseMore" style={styles.courseMore}>
                  <p style={styles.courseMoreP} > fetching... </p>
                </div>
                :
                <div className="courseMore" style={styles.courseMore}>
                  <p style={styles.courseMoreP} onClick={this.onLoadMore}> more courses </p>
                </div>
          }
          </Scrollbars>
      </div>
    );
  }
}

CourseTable.styles = {
  courseMore: {
    cursor: 'pointer',
    background: 'rgb(119, 119, 119)',
    textAlign: 'center',
    padding: '15px'
  },
  courseMoreP: {
    color: '#FFF',
    margin: '0'
  }
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
