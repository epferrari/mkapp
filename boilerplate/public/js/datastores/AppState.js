import Reflux from 'reflux';
import appActions from '../actions';
import {merge,contains} from 'lodash';
import {typeOf} from '@epferrari/js-utils';
import State from '@epferrari/immutable-state';

import ConduxClient from 'condux-client';
import conduxService from '../../../condux/public';

var initialState = {
	currentPath: 'home',
	wsConnection: 0,
	inLoadingState: false,
	navbarColor: undefined,
	showNavbarTitle: false,
	materialNav: false
};

var app = new State(initialState);


var stateStore = Reflux.createStore({
	listenables: [appActions],

	onSET_CONNECTION_STATUS(status){

		var ns = [
			ConduxClient.CONNECTED,
			ConduxClient.CONNECTING,
			ConduxClient.DISCONNECTED
		];
		if(ns.indexOf(status) !== -1){
			let newState = app.setState({
				wsConnection: status,
				inLoadingState: (status === ConduxClient.CONNECTING)
			});
			this.trigger(newState);
		}
	},

	onDID_NAVIGATE(payload){
		if(payload.path !== app.state.currentPath){
			// attempt reconnection to condux service upon navigating to a new view
			if(!conduxService.connected && !conduxService.connecting) conduxService.reconnect();

			let newState = app.setState({
				//currentPath: payload.path,
				viewTitle: payload.viewTitle
			});

			this.trigger(newState);
		}
	},

	onTOGGLE_NAVBAR_TYPE(){
		this.trigger( app.setState({materialNav: !app.state.materialNav}) );
	},

	onENTER_LOADING_STATE(){
		if(!app.state.inLoadingState){
			this.trigger( app.setState({inLoadingState: true}) );
		}
	},

	onEXIT_LOADING_STATE(){
		// remove a temporary loading state
		if(app.state.inLoadingState && app.state.wsConnection !== ConduxClient.CONNECTING){
			this.trigger( app.setState({inLoadingState: false}) );
		}
	},

	onSET_NAVBAR_COLOR(color){
		if(app.state.navbarColor !== color){
			this.trigger( app.setState({navbarColor: color}) );
		}
	},

	onSHOW_NAVBAR_TITLE(){
		if(!app.state.showNavbarTitle) this.trigger( app.setState({showNavbarTitle: true}) );
	},

	onHIDE_NAVBAR_TITLE(){
		if(app.state.showNavbarTitle) this.trigger( app.setState({showNavbarTitle: false}) );
	},

	getState(){
		return app.state;
	}
});


export default stateStore;
