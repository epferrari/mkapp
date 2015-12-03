/* Condux client service for public app */

import ConduxClient
	from 'condux-client';

import {SET_CONNECTION_STATUS}
	from '../../public/actions';

import {CONDUX_SERVER,PORT}
	from '../../../mkapp_config.js';

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

module.exports = new ConduxClient("http://" + CONDUX_SERVER + ":" + PORT + "/condux",persistenceOptions);
