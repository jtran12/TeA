import React from 'react';
import lodash from 'lodash';
import Radium from 'radium';
import LinearProgress from 'material-ui/LinearProgress';

@Radium
class CourseListSingle extends React.Component {

  constructor(props){
    super(props);

    this.state = {
    };
  }

  render() {
    const styles = lodash.cloneDeep(this.constructor.styles);

    return (
      <div style={ styles.course } onClick={ () => this.props.select(this.props.course) }>
        <h1 style={ styles.text }> { this.props.course.name } </h1>
        <LinearProgress style={ styles.progress }
                        mode="determinate"
                        max={this.props.course.maxTAs}
                        value={this.props.course.currentTAs}>
        </LinearProgress>
      </div>
    );
  }
}

CourseListSingle.styles = {
  text: {
    margin: '0',
    position: 'absolute',
    zIndex: '10',
    fontSize: '1.4em',
    padding: '15px',
    height: '100%',
    textShadow: '0 0 4px #888',
  },
  course: {
    position: 'relative',
    height: '48px',
    cursor: 'pointer',
    color: "#FFF",
    opacity: '0.9',
    ':hover': {
      color: '#EEE',
      opacity: '1'
    }
  },
  progress: {
    height: '100%',
    position: 'absolute',
    borderRadius: '0',
  }

};

export default CourseListSingle;