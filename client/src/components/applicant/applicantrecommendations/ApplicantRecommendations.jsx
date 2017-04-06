import React from 'react';
import lodash from 'lodash';
import Radium from 'radium';
import {Table, TableHeader, TableHeaderColumn, TableBody, TableRow, TableRowColumn} from 'material-ui/Table'
import RaisedButton from 'material-ui/RaisedButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/svg-icons/navigation/menu';

import { Scrollbars } from 'react-custom-scrollbars';

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
        <Scrollbars style={{ width: 600, height: 400 }}>
          <Table fixedHeader={false}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false} sortable={true}>
              <TableRow>
                <TableHeaderColumn style={styles.idwidth}>Utorid</TableHeaderColumn>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Enrollment Level</TableHeaderColumn>
                <TableHeaderColumn>Year</TableHeaderColumn>
                <TableHeaderColumn />
              </TableRow>
            </TableHeader>
            {/* The table headers should allow sortable which will be included in a function later */}
            
              <TableBody displayRowCheckbox={false} showRowHover={true} stripedRows={false}>
                    <TableRow selectable={false}>
                      <TableRowColumn style={styles.idwidth} >testID</TableRowColumn>
                      <TableRowColumn>User Name</TableRowColumn>
                      <TableRowColumn>Program name</TableRowColumn>
                      <TableRowColumn>Program year</TableRowColumn>
                      <TableRowColumn>
                        <RaisedButton primary={true} icon={<AddIcon/>}/>
                      </TableRowColumn>
                    </TableRow>
              </TableBody>
          </Table>
          </Scrollbars>
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
