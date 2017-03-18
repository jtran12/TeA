import React from 'react';
import lodash from 'lodash';

import * as courseActions from '../../actions/course/courseActions';
import { connect } from 'react-redux';

import {Tabs, Tab} from 'material-ui/Tabs';

import SwipeableViews from 'react-swipeable-views';

import Header from '../shared/Header.jsx';
import Footer from '../shared/Footer.jsx';

import Course from '../../containers/coursecontainer/Course.jsx';
import Applicant from '../applicant/Applicant.jsx';

class Manage extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      tabIndex: 0,
    };

    this.onTabChange = this.onTabChange.bind(this);
  }

  onTabChange(val) {
    this.setState({
      tabIndex: val
    });
  }

  render() {
    const styles = lodash.cloneDeep(this.constructor.styles);

    return (
      <div>
        <Header/>
        <div className="container">
          <div className="page-header">
            <h1>Coordinator</h1>
          </div>
          <div>
            <Tabs onChange={this.onTabChange} value={this.state.tabIndex}>
              <Tab onClick={ ()=> this.props.deselectCourse() } label="Course" value={0}/>
              <Tab label="Applicant" value={1}/>
            </Tabs>
            <SwipeableViews index={this.state.tabIndex} onChangeIndex={this.onTabChange}>
              <div style={styles.section}>
                <Course/>
              </div>
              <div style={styles.section}>
                <Applicant/>
              </div>
            </SwipeableViews>
          </div>
          <Footer/>
        </div>
      </div>
    );
  }
}

Manage.styles = {
  section: {
    padding: '2% 2% 2% 2%'
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    course: state.course
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    deselectCourse: course => dispatch(courseActions.deselectCourse())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Manage);
