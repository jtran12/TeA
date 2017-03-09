import React from 'react';
import lodash from 'lodash';

class Footer extends React.Component {
  render() {
    const styles = lodash.cloneDeep(this.constructor.styles);

    return (
      <h6 className="text-center">
        CSC302 Course Project | Team 17
        <br/>
        University of Toronto
      </h6>
    );
  }
}

Footer.styles = {
};

export default Footer;
