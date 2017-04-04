import React from 'react';
import lodash from 'lodash';
import {browserHistory} from 'react-router';
import { connect } from 'react-redux';
import {Tabs, Tab} from 'material-ui/Tabs';

import headerActions from '../../actions/header/headerActions';
import * as courseActions from '../../actions/course/courseActions';


class HeaderContents extends React.Component {

  constructor(props){
    super(props);
    this.onLogout = this.onLogout.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);

    this.state = {
      courseLabel: "course",
      applicantLabel: "applicant"
    };
  }

  onLogout() {
    browserHistory.push('/');
  }

  updateDimensions() {
    let w = window,
      d = document,
      documentElement = d.documentElement,
      body = d.getElementsByTagName('body')[0],
      width = w.innerWidth || documentElement.clientWidth || body.clientWidth

      if(width < 750) {
        this.setState({
          courseLabel: <i className="material-icons">assignment</i>,
          applicantLabel: <i className="material-icons">assignment_ind</i>
        });
      }
      else {
        this.setState ({
          courseLabel: "course",
          applicantLabel: "applicant"
        });
      }
  }
  componentWillMount() {
    this.updateDimensions();
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    const styles = lodash.cloneDeep(this.constructor.styles);

    return (
      <div className="appBar" style={HeaderContents.styles.maxHeight}>
        <div className="appTitle" style={HeaderContents.styles.title}>
          <h1 style={HeaderContents.styles.h1}> TeA </h1>
        </div>
        <div className="appTabs" style={HeaderContents.styles.tabs}>
          <Tabs style={HeaderContents.styles.maxHeight} onChange={this.props.onTabChange} value={this.props.header.index}>
            <Tab style={HeaderContents.styles.tab}
                 label={this.state.courseLabel} value={0}/>
            <Tab style={HeaderContents.styles.tab}
                 label={this.state.applicantLabel}  value={1}/>
          </Tabs>
        </div>
      </div>
    );
  }
}

HeaderContents.styles = {
  maxHeight: {
    height: '100%'
  },
  Wrapper: {
    width: '100%',
    height: '100%',
    textAlign: 'center'
  },
  title: {
    display: 'inline-block',
    verticalAlign: 'middle'
  },
  tabs: {
    display: 'inline-block',
    verticalAlign: 'middle',
    marginLeft: '15px',
    width: '75%',
    height: '100%',
  },
  tab: {
    width: '25%',
    height: '64px',
    backgroundColor: 'rgb(0, 188, 212)'
  },
  h1: {
    margin: '0'
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

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContents);
