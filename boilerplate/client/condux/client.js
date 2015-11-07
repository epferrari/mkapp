import ConduxClient
	from 'condux-client';

import {SET_CONNECTION_STATUS}
	from '../actions';

import {CONDUX_SERVER,PORT}
	from '../../config.js';

var persistenceOptions = {
	enabled: true,
	attempts: 12,
	interval: 4000,
	onConnecting: () => {
		//console.log('establishing connection');
		SET_CONNECTION_STATUS(ConduxClient.CONNECTING);
	},
	onConnection: () => {
		//console.log('connected to nexus');
		SET_CONNECTION_STATUS(ConduxClient.CONNECTED);
	},
	onDisconnect: () => {
		//console.log('disconnected from nexus');
		SET_CONNECTION_STATUS(ConduxClient.DISCONNECTED);
	},
	onReconnect: () => {
		//console.log('reconnected to nexus');
		SET_CONNECTION_STATUS(ConduxClient.CONNECTED);
	}
};

var conduxApp = new ConduxClient("http://" + CONDUX_SERVER + ":" + PORT + "/condux",persistenceOptions);

module.exports = conduxApp;
