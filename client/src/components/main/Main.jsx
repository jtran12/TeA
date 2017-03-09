import React from 'react';
import lodash from 'lodash';

class Main extends React.Component {

  constructor(props){
    super(props);
    this.state = {
    };
  }

  render() {
    const styles = lodash.cloneDeep(this.constructor.styles);

    return (
      <div>
        <h1>Hello World</h1>
      </div>
    );
  }
}

Main.styles = {

};

export default Main;
