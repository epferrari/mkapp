/* condux server actions to mirror admin app actions */

import actionNames from '../admin/constants.js';
import Reflux from 'reflux';
import conduxServer from '../server';

module.exports = conduxServer.createActions( Object.keys(actionNames) );
