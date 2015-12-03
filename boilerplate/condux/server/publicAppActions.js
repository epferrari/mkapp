/* condux server actions to mirror public app actions */

import actionNames from '../public/constants.js';
import Reflux from 'reflux';
import conduxServer from '../server';

module.exports = conduxServer.createActions( Object.keys(actionNames) );
