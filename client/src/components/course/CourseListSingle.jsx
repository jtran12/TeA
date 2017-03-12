import React from 'react';
import lodash from 'lodash';
import LinearProgress from 'material-ui/LinearProgress';

class CourseListSingle extends React.Component {

  constructor(props){
    super(props);

    this.state = {
    };
  }

  render() {
    const styles = lodash.cloneDeep(this.constructor.styles);

    return (
      <div>
        <LinearProgress style={styles.progress}
                        mode="determinate"
                        max={this.props.course.maxTAs}
                        value={this.props.course.currentTAs}>
        </LinearProgress>

        <h1> { this.props.course.name } </h1>

      </div>
    );
  }
}

CourseListSingle.styles = {
  progress: {
    position: absolute,
    height: '100%'
  }

};

export default CourseListSingle;
