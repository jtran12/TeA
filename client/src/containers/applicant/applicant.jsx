import React from 'react';
import lodash from 'lodash';
import autobind from 'react-autobind';
import {browserHistory} from 'react-router';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

import Applicant from '../../components/applicant/applicantview/ApplicantView.jsx';
import Footer from '../../components/shared/Footer.jsx';

class Login extends React.Component {
  constructor(props) {
    super(props);
    autobind(this);
    this.state = {
      applicant: {
        utorid: "anniann",
        studentnumber: 1000918273,
        familyname: "Anni",
        givenname: "Ann",
        program: "phd",
        year: 2,
        phonenumber: "4164164169",
        email: "anniann@mail.ca",
        studentdepartment: "Computer Science",
        tacourses: [],
        courses: [],
        declined: false,
        declinedcount: 0,
        declinedcourses: [],
        currentassignedcourses: [],
        appliedcourses: [{
          utorid: "anniann",
          course: "CSC148S2018",
          assigned: true,
          accepted: false,
          coursecode: "CSC148",
          term: "S",
          year: 2018,
          requirements: [
            "CSC108"
          ],
          head_instructor: "Heap, D.",
          additional_instructors: [
            "Smith, J.",
            "Simion, B."
          ],
          tas: [],
          expected_enrollment: 200,
          current_enrollment: 134,
          max_enrollment: 300,
          currentta: 14,
          maxta: 20,
          recommended_applicants: [
            "jjsjsjs 105",
            "jisi123 105",
            "popo123 105",
            "under1 85",
            "under1 85",
            "sambaman 65"
          ]
        }]
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
          <Applicant selected={this.state.applicant} applicant={true}/>
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
