import React from 'react';
import lodash from 'lodash';
import MUIThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends React.Component {
  render() {
    const styles = lodash.cloneDeep(this.constructor.styles);

    return (
      <MUIThemeProvider className="index" style={styles.Wrapper}>
        {this.props.children}
      </MUIThemeProvider>
    );
  }
}

App.styles = {
  Wrapper: {
    width: '100%',
    height: '100%',
    textAlign: 'center'
  }
};

export default App;
