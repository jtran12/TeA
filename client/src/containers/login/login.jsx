import React from 'react';
import lodash from 'lodash';
import autobind from 'react-autobind';
import {browserHistory} from 'react-router';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Login extends React.Component {
  constructor(props) {
    super(props);
    autobind(this);
    this.state = {
      username: '',
      password: '',

      usernameValidate: ''
    };

  }

  onTextFieldChange(e){
    this.setState({[e.target.name]: e.target.value, usernameValidate: ''});
  }

  onSubmit() {
    if (this.state.username === 'zaleski') {
      browserHistory.push('/instructor');
    } else if (this.state.username === 'anniann') {
      browserHistory.push('/applicant');
    } else if (this.state.username === 'admin') {
      browserHistory.push('/main');
    } else {
      this.setState({usernameValidate: 'Invalid username'});
    }
  }

  render() {
    const styles = lodash.cloneDeep(this.constructor.styles);

    return (
      <div style={styles.Wrapper}>
        <Paper style={styles.LoginBox} className="center-block col-md-5 col-xs-8" zDepth={5}>
          <img src="../../static/tea.png" /><br/>
          <h3 style={styles.Title}>TeA </h3>
          <TextField floatingLabelText="Username"
                     name="username"
                     errorText={this.state.usernameValidate}
                     onChange={this.onTextFieldChange}/>
          <br/>
          <TextField floatingLabelText="Password"
                     name="password"
                     type='password'
                     onChange={this.onTextFieldChange}/>
          <br/>
          <RaisedButton style={styles.Button} primary={true} label="Login" onClick={this.onSubmit}/>
        </Paper>
      </div>
    );
  }
}

Login.styles = {
  Wrapper: {
    margin: 0,
    height: '100%',
    width: '100%',
    textAlign: 'center',
    paddingTop: '15%',
    backgroundColor: '#F0E8D0'
  },
  LoginBox: {
    textAlign: 'center',
    float: 'none',
    padding: '2% 0 2% 0'
  },
  Error: {
    margin: '2% 2% 2% 2%'
  },
  Button: {
    margin: '5% auto auto auto'
  }
};

export default Login;
