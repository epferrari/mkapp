import Reflux from 'reflux';
import appActions from '../actions';
import {merge,contains} from 'lodash';
import {typeOf} from '@epferrari/js-utils';

import ConduxClient from 'condux-client';
import conduxService from '../../condux/public';


var initialState = {
	currentPath: 'home',
	wsConnection: 0,
	inLoadingState: false,
	navbarColor: 'transparent',
	showNavbarTitle: false
};

var $state = {};


function setState(newState){
	$state = merge({},$state,newState);
	stateStore.trigger($state);
}


var stateStore = Reflux.createStore({
	listenables: [appActions],
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
		if(payload.path !== $state.currentPath){
			if(!conduxService.connected && !conduxService.connecting) conduxService.reconnect();
			setState({
				currentPath: payload.path,
				viewTitle: payload.viewTitle,
				backButtonLink: payload.backButtonLink
			});
		}
	},

	onENTER_LOADING_STATE(){
		if(!$state.inLoadingState){
			setState({inLoadingState: true});
		}
	},

	onEXIT_LOADING_STATE(){
		if($state.inLoadingState && !$state.wsConnection === ConduxClient.CONNECTING){
			setState({inLoadingState: false});
		}
	},

	onSET_NAVBAR_COLOR(color){
		if($state.navbarColor !== color){
			setState({navbarColor: color});
		}
	},

	onSHOW_NAVBAR_TITLE(){
		if(!$state.showNavbarTitle) setState({showNavbarTitle: true});
	},

	onHIDE_NAVBAR_TITLE(){
		if($state.showNavbarTitle) setState({showNavbarTitle: false});
	},

	getState(filter){
		if(!arguments.length){
			return merge({},$state);
		}else{
			var keys = [];
			if(typeOf(filter) === 'string'){
				keys = [].slice.call(arguments,0);
				// return the single value
				if(keys.length === 1) return $state[filter];
			}else if(typeOf(filter) === 'array'){
				keys = filter;
			}else if(typeOf(filter) === 'object'){
				keys = Object.keys(filter);
			}
			if(keys.length){
				// return reduced $state object with only keys/values of arguments passed to getState
				return keys.reduce((r,k) => {
					r[k] = $state[k];
					return r;
				},{});
			}else{
				// default to returning a merged copy of the entire $state
				return merge({},$state);
			}
		}
	}
});

setState(initialState);

export default stateStore;
