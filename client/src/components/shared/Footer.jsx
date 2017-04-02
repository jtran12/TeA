import React from 'react';
import lodash from 'lodash';

class Footer extends React.Component {
  render() {
    const styles = lodash.cloneDeep(this.constructor.styles);

    return (
      <div style={styles.footer}>
        <h6 className="text-center" style={styles.h6}>
          CSC302 Course Project | Team 17
          <br/>
          University of Toronto
        </h6>
      </div>
    );
  }
}

Footer.styles = {
  footer: {
    boxShadow: '0 1px 4px #aaa',
    background: '#008596',
    color: '#FFF'
  },
  h6: {
    margin: '0',
    padding: '13.2px 0'
  }

};

export default Footer;
