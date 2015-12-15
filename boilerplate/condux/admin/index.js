/* Condux client service for admin app */

import ConduxClient
	from 'condux-client';

import {SET_CONNECTION_STATUS}
	from '../../admin/actions';

import {CONDUX_SERVER,PORT}
	from '../../../mkapp_config.json';

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

var condux = new ConduxClient("http://" + CONDUX_SERVER + ":" + PORT + "/condux",persistenceOptions);

module.exports = condux;
