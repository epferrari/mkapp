import ClientNexus
	from 'reflux-nexus-client';

import {SET_CONNECTION_STATUS}
	from '../actions/appActions.js';

import nexusStatus
	from './constants.js';

import servers from '../constants/servers.js';


var persistenceOptions = {
	enabled: true,
	attempts: 12,
	interval: 4000,
	onConnecting: () => {
		console.log('establishing connection');
		SET_CONNECTION_STATUS(nexusStatus.CONNECTING);
	},
	onConnection: () => {
		console.log('connected to nexus');
		SET_CONNECTION_STATUS(nexusStatus.CONNECTED);
	},
	onDisconnect: () => {
		console.log('disconnected from nexus');
		SET_CONNECTION_STATUS(nexusStatus.DISCONNECTED);
	},
	onReconnect: () => {
		console.log('reconnected to nexus');
		SET_CONNECTION_STATUS(nexusStatus.CONNECTED);
	}
};

var server = servers.LOCAL;
var port = process.env.PORT || 3030;
var nexus = new ClientNexus("http://" + server + ":" + port + "/reflux-nexus",persistenceOptions);

export {nexus as default};
