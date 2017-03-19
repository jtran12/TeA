import React from 'react';
import lodash from 'lodash';
import {browserHistory} from 'react-router';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

class Header extends React.Component {

  constructor(props){
    super(props);
    this.onLogout = this.onLogout.bind(this);
  }

  onLogout() {
    browserHistory.push('/');
  }

  render() {
    const styles = lodash.cloneDeep(this.constructor.styles);

    return (
      <AppBar title="ReiderRabbit"
              showMenuIconButton={false}
              iconElementRight={<FlatButton label="Logout" onClick={this.onLogout}/>}/>
    );
  }
}

Header.styles = {
  Wrapper: {
    width: '100%',
    height: '100%',
    textAlign: 'center'
  }
};

export default Header;
