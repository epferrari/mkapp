import express from 'express';
import {reduce} from 'lodash';
import apiV1 from './api/v1.0';
import path from 'path';

import {PORT} from '../../mkapp_config.json';

var app = express();

var hostname = process.env.HOSTNAME || 'localhost';
var port = parseInt(PORT, 10);
var publicApp = path.resolve(__dirname,'../public');
var adminApp = path.resolve(__dirname,'../admin');

app.use('/app',express.static(publicApp));
app.use('/admin',express.static(adminApp));
app.use('/api/v1.0/',apiV1);

var server = app.listen(port,hostname,() => {
	console.log("You are now serving static files from %s listening at http://%s:%s", "./public & ./admin", hostname, port);
});

if(process.env.NODE_ENV !== 'production'){
	var exts = ['js','jsx','css','png','jpg'];
	var livereload = require('livereload');
	var publicDevServer = livereload.createServer({
		exts: exts,
		port: 35728,
		applyJSLive: true
	});
	var adminDevServer = livereload.createServer({
		exts: exts,
		port: 35729,
		applyJSLive: true
	})

	publicDevServer.watch(path.resolve(__dirname,'../public'));
	adminDevServer.watch(path.resolve(__dirname,'../admin'));
}

import conduxServer from '../condux/server';
import demoChannel from '../condux/server/channels/demo.js';

conduxServer.attach(server);
