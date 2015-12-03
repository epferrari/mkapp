import constants from './constants.js';
import Reflux from 'reflux';

module.exports = Reflux.createActions( Object.keys(constants) );
