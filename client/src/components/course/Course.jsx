import React from 'react';
import lodash from 'lodash';

import Paper from 'material-ui/Paper';

import CourseView from './CourseView.jsx';
import CourseList from './CourseList.jsx';

class Course extends React.Component {

  constructor(props){
    super(props);

    this.state = {
    };
  }

  render() {
    const styles = lodash.cloneDeep(this.constructor.styles);

    return (
      <div className="row">
        <Paper className="col-md-4 col-xs-12">
          <CourseList/>
        </Paper>
        <Paper style={styles.course} zDepth={3} className="col-xs-12 col-md-8">
          <CourseView/>
        </Paper>
      </div>
    );
  }
}

Course.styles = {
  course:{
    margin: '0% 0% 2% 0'
  },
  card: {
    margin: '2% 0 2% 0'
  },
  idwidth: {
    width: '20%'
  },
  sessionwidth:{
    width: '20%'
  },
  actionwidth:{
    width: '18%'
  }
};

export default Course;
