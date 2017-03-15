import React from 'react';
import lodash from 'lodash';

import {Table, TableHeader, TableHeaderColumn, TableBody, TableRow, TableRowColumn} from 'material-ui/Table'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
import Dialog from 'material-ui/Dialog';

import AddIcon from 'material-ui/svg-icons/content/add';
import RemoveIcon from 'material-ui/svg-icons/content/clear';
import CourseCoordinatorIcon from 'material-ui/svg-icons/social/person-outline';

class ApplicantTable extends React.Component {

  constructor(props){
    super(props);

    this.state = {
    };
  }

  render() {
    const styles = lodash.cloneDeep(this.constructor.styles);

    return (
      <div>
        <h3>Applicants</h3>
          <Table fixedHeader={true}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false} sortable={true}>
              <TableRow>
                <TableHeaderColumn> <RaisedButton primary={true} bsSize="xsmall">+ Graduate Only</RaisedButton> </TableHeaderColumn>
                <TableHeaderColumn> <RaisedButton primary={true} bsSize="xsmall">+ Previous Experience</RaisedButton> </TableHeaderColumn>
                <TableHeaderColumn> <RaisedButton primary={true} bsSize="xsmall">+ Recommended</RaisedButton> </TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableHeaderColumn style={styles.idwidth}>ID</TableHeaderColumn>
                <TableHeaderColumn>First Name</TableHeaderColumn>
                <TableHeaderColumn>Last Name</TableHeaderColumn>
                <TableHeaderColumn>Enrollment Level</TableHeaderColumn>
                <TableHeaderColumn />
              </TableRow>
            </TableHeader>
            {/* The table headers should allow sortable which will be included in a function later */}
            <TableBody displayRowCheckbox={false} showRowHover={true} stripedRows={false}>
              <TableRow selectable={false}>
                <TableRowColumn style={styles.idwidth}>1001143223</TableRowColumn>
                <TableRowColumn>Test</TableRowColumn>
                <TableRowColumn>User</TableRowColumn>
                <TableRowColumn>UG - 2</TableRowColumn>
                <TableRowColumn>
                  <RaisedButton primary={true} icon={<AddIcon/>}/>
                </TableRowColumn>
              </TableRow>
              <TableRow selectable={false}>
                <TableRowColumn style={styles.idwidth}>1001143223</TableRowColumn>
                <TableRowColumn>Tester</TableRowColumn>
                <TableRowColumn>User</TableRowColumn>
                <TableRowColumn>UG - 4</TableRowColumn>
                <TableRowColumn>
                  <RaisedButton primary={true} icon={<AddIcon/>}/>
                </TableRowColumn>
              </TableRow>
              <TableRow selectable={false}>
                <TableRowColumn style={styles.idwidth}>1001143223</TableRowColumn>
                <TableRowColumn>PhdTest</TableRowColumn>
                <TableRowColumn>User</TableRowColumn>
                <TableRowColumn>Graduate - 2</TableRowColumn>
                <TableRowColumn>
                  <RaisedButton primary={true} icon={<AddIcon/>}/>
                </TableRowColumn>
              </TableRow>
              <TableRow selectable={false}>
                <TableRowColumn style={styles.idwidth}>1001143223</TableRowColumn>
                <TableRowColumn>PhDMan</TableRowColumn>
                <TableRowColumn>User</TableRowColumn>
                <TableRowColumn>Graduate - 1</TableRowColumn>
                <TableRowColumn>
                  <RaisedButton primary={true} icon={<AddIcon/>}/>
                </TableRowColumn>
              </TableRow>
              <TableRow selectable={false}>
                <TableRowColumn style={styles.idwidth}>1001143223</TableRowColumn>
                <TableRowColumn>MastersMan</TableRowColumn>
                <TableRowColumn>User</TableRowColumn>
                <TableRowColumn>Graduate - 1</TableRowColumn>
                <TableRowColumn>
                  <RaisedButton primary={true} icon={<AddIcon/>}/>
                </TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
      </div>
    );
  }
}

ApplicantTable.styles = {

};

export default ApplicantTable;
