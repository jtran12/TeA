import React from 'react';
import lodash from 'lodash';

import * as courseActions from '../../actions/course/courseActions';
import { connect } from 'react-redux';
import autobind from 'react-autobind';

import {Tabs, Tab} from 'material-ui/Tabs';

import SwipeableViews from 'react-swipeable-views';

import Header from '../shared/Header.jsx';
import Footer from '../shared/Footer.jsx';

import Course from '../coursecontainer/Course.jsx';
import Applicant from '../applicant/Applicant.jsx';

class Manage extends React.Component {

  constructor(props){
    super(props);
    autobind(this);

    this.state = {
      tabIndex: 0,
    };

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
        <SwipeableViews index={this.state.tabIndex} onChangeIndex={this.onTabChange}>
          <div style={styles.section}>
            <Course/>
          </div>
          <div style={styles.section}>
            <Applicant/>
          </div>
        </SwipeableViews>
      <Footer/>
      </div>
    );
  }
}

Manage.styles = {
  section: {
    padding: '0 1% 2% 1%'
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
