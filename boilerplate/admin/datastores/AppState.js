import Reflux from 'reflux';
import appActions from '../actions';
import {merge,contains} from 'lodash';
import ConduxClient from 'condux-client';
import condux from '../condux/client.js';
import {typeOf} from '@epferrari/js-utils';

var appState = {
	currentPath: 'home',
	wsConnection: 0,
	inLoadingState: false,
	navbarColor: 'transparent',
	showNavbarTitle: false
};


function setState(newState){
	appState = merge({},appState,newState);
	StateStore.trigger(appState);
}


var StateStore = Reflux.createStore({
	listenables: appActions,
	onSET_CONNECTION_STATUS(status){

		var ns = [
			ConduxClient.CONNECTED,
			ConduxClient.CONNECTING,
			ConduxClient.DISCONNECTED
		];

		if(ns.indexOf(status) !== -1){
			setState({
				wsConnection: status,
				inLoadingState: (status === ConduxClient.CONNECTING)
			});
		}
	},

	onDID_NAVIGATE(payload){
		if(payload.path !== appState.currentPath){
			if(!condux.connected && !condux.connecting) condux.reconnect();
			setState({
				currentPath: payload.path,
				viewTitle: payload.viewTitle,
				backButtonLink: payload.backButtonLink
			});
		}
	},

	onENTER_LOADING_STATE(){
		if(!appState.inLoadingState){
			setState({inLoadingState: true});
		}
	},

	onEXIT_LOADING_STATE(){
		if(appState.inLoadingState && !appState.wsConnection === ConduxClient.CONNECTING){
			setState({inLoadingState: false});
		}
	},

	onSET_NAVBAR_COLOR(color){
		if(appState.navbarColor !== color){
			setState({navbarColor: color});
		}
	},

	onSHOW_NAVBAR_TITLE(){
		if(!appState.showNavbarTitle) setState({showNavbarTitle: true});
	},

	onHIDE_NAVBAR_TITLE(){
		if(appState.showNavbarTitle) setState({showNavbarTitle: false});
	},

	getState(filter){
		if(!arguments.length){
			return merge({},appState);
		}else{
			var keys = [];
			if(typeOf(filter) === 'string'){
				keys = [].slice.call(arguments,0);
				// return the single value
				if(keys.length === 1) return appState[filter];
			}else if(typeOf(filter) === 'array'){
				keys = filter;
			}else if(typeOf(filter) === 'object'){
				keys = Object.keys(filter);
			}
			if(keys.length){
				// return reduced appState object with only keys/values of arguments passed to getState
				return keys.reduce((r,k) => {
					r[k] = appState[k];
					return r;
				},{});
			}else{
				// default to returning a merged copy of the entire appState
				return merge({},appState);
			}
		}
	}
});

global.stateStore = StateStore;
export default StateStore;
