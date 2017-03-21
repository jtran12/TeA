import React from 'react';
import lodash from 'lodash';
import {browserHistory} from 'react-router';


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
      <Tabs onChange={this.onTabChange} value={this.state.tabIndex}>
        <Tab onClick={ ()=> this.props.deselectCourse() } label="Course" value={0}/>
        <Tab label="Applicant" value={1}/>
      </Tabs>
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

export default HeaderContents;
