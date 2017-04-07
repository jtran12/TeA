import React from 'react';
import lodash from 'lodash';
import autobind from 'react-autobind';
import {browserHistory} from 'react-router';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

import Course from '../../components/course/courseview/CourseView.jsx';
import Footer from '../../components/shared/Footer.jsx';

class Login extends React.Component {
  constructor(props) {
    super(props);
    autobind(this);
    this.state = {
      course: {
        course: "CSC301F2017",
        coursecode: "CSC300",
        term: "F",
        year: 2017,
        requirements: [],
        head_instructor: "Mathew Zaleski",
        additional_instructors: ["Lindsay Shorser"],
        tas: [],
        expected_enrollment: 200,
        current_enrollment: 200,
        max_enrollment: 300,
        currentta: 25,
        maxta: 100
      }
    };
  }
  logout(){
    browserHistory.push('/');
  }
  render() {
    const styles = lodash.cloneDeep(this.constructor.styles);

    return (
      <div>
        <AppBar title={'TeA'}
                showMenuIconButton={true}
                iconElementLeft={<img src="../../static/tea.png" />}
                iconElementRight={<FlatButton label="Logout" onClick={this.logout}/>}/>
        <div className="container">
          <Course selected={this.state.course} instructor={true}/>
        </div>
        <div style={styles.Footer}>
          <Footer />
        </div>
      </div>
    );
  }
}

Login.styles = {
  Footer : {
    position: 'absolute',
    bottom: '0',
    width: '100%'
  }
};

export default Login;
