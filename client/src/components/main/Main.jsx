import React from 'react';
import lodash from 'lodash';

import {Tabs, Tab} from 'material-ui/Tabs';

import SwipeableViews from 'react-swipeable-views';

import Header from '../shared/Header.jsx';
import Footer from '../shared/Footer.jsx';

import Course from '../course/Course.jsx';
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
              <Tab label="Course" value={0}/>
              <Tab label="Applicant" value={1}/>
            </Tabs>
            <SwipeableViews index={this.state.tabIndex} onChangeIndex={this.onTabChange}>
              <div style={styles.table}>
                <Course/>
              </div>
              <div style={styles.table}>
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
  table: {
    marginTop: '3%'
  }
};

export default Manage;
