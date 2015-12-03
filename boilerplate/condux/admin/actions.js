import constants from './constants.js';
import condux from './';

module.exports = condux.createActions( Object.keys(constants) );
