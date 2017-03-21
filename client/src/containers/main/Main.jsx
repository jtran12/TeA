import React from 'react';
import lodash from 'lodash';
import { connect } from 'react-redux';
import autobind from 'react-autobind';

import SwipeableViews from 'react-swipeable-views';

import Header from '../../components/shared/Header'
import Footer from '../../components/shared/Footer.jsx';

import Course from '../coursecontainer/Course.jsx';
import Applicant from '../../components/applicant/Applicant.jsx';
import * as headerActions from '../../actions/header/headerActions';

class Manage extends React.Component {

  constructor(props){
    super(props);
    autobind(this);

  }

  render() {
    const styles = lodash.cloneDeep(this.constructor.styles);

    return (
      <div>
        <Header/>
        <SwipeableViews index={this.props.header.index} onChangeIndex={this.props.onTabChange}>
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
    header: state.header
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTabChange: index => dispatch(headerActions.selectTab(index))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Manage);
