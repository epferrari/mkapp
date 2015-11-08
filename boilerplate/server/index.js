import express from 'express';
import {reduce} from 'lodash';
import apiV1 from './api/v1.0';
import path from 'path';
import Condux from 'condux';
import {PORT} from '../../config.js';

var app = express();

var hostname = process.env.HOSTNAME || 'localhost';
var port = parseInt(PORT, 10);
var clientApp = path.resolve(__dirname,'../client');
var adminApp = path.resolve(__dirname,'../admin');

app.use('/app',express.static(clientApp));
app.use('/admin',express.static(adminApp));
app.use('/api/v1.0/',apiV1);

var server = app.listen(port,hostname,() => {
	console.log("You are now serving static files from %s listening at http://%s:%s", "./client & ./admin", hostname, port);
});

if(process.env.NODE_ENV !== 'production'){
	var exts = ['js','jsx','css','png','jpg'];
	var livereload = require('livereload');
	var clientDevServer = livereload.createServer({
		exts: exts,
		port: 35728,
		applyJSLive: true
	});
	var adminDevServer = livereload.createServer({
		exts: exts,
		port: 35729,
		applyJSLive: true
	})

	clientDevServer.watch(path.resolve(__dirname,'../client'));
	adminDevServer.watch(path.resolve(__dirname,'../admin'));
}

var x = new Condux();

var b = x.createAction('actionB');
x.createStore('/demoStore',{
	init(){
		this.listenTo(b,() => console.log('action B triggered'));
	},
	listenables: [x.createActions(['actionA'])],
	onActionA(){
		console.log('action A triggered');
	}
});
x.attach(server);
