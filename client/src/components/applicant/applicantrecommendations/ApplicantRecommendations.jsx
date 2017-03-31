import React from 'react';
import lodash from 'lodash';
import Radium from 'radium';
import {Table, TableHeader, TableHeaderColumn, TableBody, TableRow, TableRowColumn} from 'material-ui/Table'
import RaisedButton from 'material-ui/RaisedButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/svg-icons/navigation/menu';

@Radium
class ApplicantRecommendations extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      recommendedApplicants: [
        {
          id: '1001143223',
          firstName: 'David',
          lastName: 'Davis',
          studentLevel: 'Year 1 Graduate Student'
        },
        {
          id: '1054367243',
          firstName: 'Lisa',
          lastName: 'Elissa',
          studentLevel: 'Year 2 Undergraduate Student'
        },
        {
          id: '1436345454',
          firstName: 'Michael',
          lastName: 'Carmichael',
          studentLevel: 'Year 4 Undergraduate Student'
        },
        {
          id: '2445345454',
          firstName: 'Jenny',
          lastName: 'Janice',
          studentLevel: 'Year 1 Undergraduate Student'
        }
      ]
    };
  }



  render() {
    const styles = lodash.cloneDeep(this.constructor.styles);

    return (
      <div className="recommendations">
        <div style={styles.root}>
          <GridList
            cols={1}
            cellHeight={100}
            padding={1}
            style={styles.gridList}
          >

            {
              this.state.recommendedApplicants.map((applicant) =>  (
              <GridTile
                key={applicant.id}
                title={applicant.firstName + ' ' + applicant.lastName}
                actionIcon={<IconButton><Menu color='white'/></IconButton>}
                actionPosition={'left'}
                titlePosition={'top'}
                subtitle={applicant.studentLevel}
              >
              </GridTile>
              ))
            }

          </GridList>
        </div>
      </div>
    );
  }
}

ApplicantRecommendations.styles = {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
    gridList: {
      width: 1250,
      height: 450,
      overflowY: 'auto',
    },
};

export default ApplicantRecommendations;
