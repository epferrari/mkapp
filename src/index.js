import express from 'express';
import {reduce} from 'lodash';
import apiV1 from './api/v1.0';
import path from 'path';
import RefluxNexus from 'reflux-nexus';

let argv = reduce(process.argv.slice(2),(accum,arg) => {
	if(arg){
		let keyval = arg.split('=');
		accum[keyval[0]] = keyval[1];
	}
	return accum;
},{});

var app = express();

var hostname = argv.host || argv.hostname || process.env.HOSTNAME || 'localhost';
var port = parseInt(argv.port || process.env.PORT || 3030, 10);
var clientApp = path.join(__dirname,'client');
var adminApp = path.join(__dirname,'admin');

app.use('/app',express.static(clientApp));
app.use('/admin',express.static(adminApp));
app.use('/api/v1.0/',apiV1);

var server = app.listen(port,hostname,() => {
	console.log("You are now serving static files from %s listening at http://%s:%s", "./client & ./admin", hostname, port);
});

var nexus = new RefluxNexus();
nexus.attach(server);
