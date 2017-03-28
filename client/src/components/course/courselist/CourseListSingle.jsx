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
      <div onClick={ () => this.props.select(this.props.courseData) } style={ styles.course }>
        <h1 style={ styles.text }> { this.props.courseData.course.toUpperCase() } </h1>
        <LinearProgress style={ styles.progress }
                        mode="determinate"
                        max={this.props.courseData.max_enrollment}
                        value={this.props.courseData.current_enrollment}>
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
    opacity: '0.75',
    ':hover': {
      color: '#ddd',
      opacity: '1',
    }
  },
  progress: {
    height: '100%',
    position: 'absolute',
    borderRadius: '0',
  }

};

export default CourseListSingle;
