import {createActions} from 'reflux';

var appActions = createActions([
	'DID_NAVIGATE',
	'SET_CONNECTION_STATUS',
	'ENTER_LOADING_STATE',
	'EXIT_LOADING_STATE',
	'SET_NAVBAR_COLOR',
	'HIDE_NAVBAR_TITLE',
	'SHOW_NAVBAR_TITLE'
]);

module.exports = appActions;
