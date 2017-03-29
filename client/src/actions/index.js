/* eslint-disable import/newline-after-import */
/* Exports all the actions from a single point.

Allows to import actions like so:

import {action1, action2} from '../actions/'
*/
/* Populated by react-webpack-redux:action */

import * as courseActions from './course/courseActions';
import * as applicantActions from './applicant/applicantActions'
import * as headerActions from './header/headerActions';

export default { courseActions, headerActions, applicantActions };
