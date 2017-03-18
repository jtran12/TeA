import React from 'react';
import lodash from 'lodash';
import Radium from 'radium';
import {Table, TableHeader, TableHeaderColumn, TableBody, TableRow, TableRowColumn} from 'material-ui/Table'
import RaisedButton from 'material-ui/RaisedButton';
import AddIcon from 'material-ui/svg-icons/content/add';

@Radium
class ApplicantRecommendations extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      recommendedApplicants: [
        {
          firstName: 'David',
          lastName: 'Davis'
        },
        {
          firstName: 'Lisa',
          lastName: 'Elissa'
        },
        {
          firstName: 'Michael',
          lastName: 'Carmichael'
        },
        {
          firstName: 'Jenny',
          lastName: 'Janice'
        }
      ]
    };
  }



  render() {
    const styles = lodash.cloneDeep(this.constructor.styles);

    return (
      <div className="recommendations">

        <h3> Recommended </h3>

        <div className="recommendations-panel">
          {
            <Table fixedHeader={true}>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn style={styles.idwidth}>ID</TableHeaderColumn>
                  <TableHeaderColumn>First Name</TableHeaderColumn>
                  <TableHeaderColumn>Last Name</TableHeaderColumn>
                  <TableHeaderColumn>Enrollment Level</TableHeaderColumn>
                  <TableHeaderColumn />
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false} showRowHover={true} stripedRows={true}>
                {
                  this.state.recommendedApplicants.map((applicant) => (
                    <TableRow selectable={false}>
                      <TableRowColumn style={styles.idwidth}>1001143223</TableRowColumn>
                      <TableRowColumn>{applicant.firstName}</TableRowColumn>
                      <TableRowColumn>{applicant.lastName}</TableRowColumn>
                      <TableRowColumn>UG - 2</TableRowColumn>
                      <TableRowColumn>
                        <RaisedButton primary={true} icon={<AddIcon/>}/>
                      </TableRowColumn>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          }
        </div>

      </div>
    );
  }
}

ApplicantRecommendations.styles = {

};

export default ApplicantRecommendations;
