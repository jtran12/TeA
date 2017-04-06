import React from 'react';
import lodash from 'lodash';
import Radium from 'radium';
import {Table, TableHeader, TableHeaderColumn, TableBody, TableRow, TableRowColumn} from 'material-ui/Table'
import RaisedButton from 'material-ui/RaisedButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/svg-icons/navigation/menu';

import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import * as courseActions from '../../../actions/course/courseActions';


@Radium
class ApplicantRecommendations extends React.Component {

  constructor(props){
    super(props);

    this.state = {
    }
  }



  render() {
    const styles = lodash.cloneDeep(this.constructor.styles);

    const course = this.props.courses.selectedCourse;

    return (
      <div className="recommendations">
        <Scrollbars style={{ width: 600, height: 400 }}>
          <Table fixedHeader={false}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false} sortable={true}>
              <TableRow>
                <TableHeaderColumn style={styles.idwidth} tooltip="Unique ID for each student">
                Utorid</TableHeaderColumn>
                <TableHeaderColumn tooltip="Score is calculated based on our recommendation system">
                Recommendation Score</TableHeaderColumn>
                <TableHeaderColumn />
              </TableRow>
            </TableHeader>
            {/* The table headers should allow sortable which will be included in a function later */}
            
              <TableBody displayRowCheckbox={false} showRowHover={true} stripedRows={false}>
               {
                  course.recommended_applicants.map((applicant, index) =>  (
                    <TableRow selectable={false} key={index}>
                      <TableRowColumn style={styles.idwidth} >
                      {applicant.slice(0, applicant.indexOf(" "))}</TableRowColumn>
                      <TableRowColumn style={styles.idwidth} >
                      {applicant.slice(applicant.indexOf(" "))}</TableRowColumn>
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

ApplicantRecommendations.styles = {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
    gridList: {
      width: 1250,
      height: 450,
      overflowY: 'auto',
    },
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

export default connect(mapStateToProps, mapDispatchToProps)(ApplicantRecommendations);