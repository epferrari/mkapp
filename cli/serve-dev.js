var Promise = require('bluebird');
var __dev = require('./constants.js').__dev;
var nodemon = require('nodemon');

function startNodemonSync(resolve){
	var server = __dev+"/server/index.js";
	var api = __dev+"/server/api";
	var middleware = __dev+"/server/middleware";
	var utils = __dev+"/utils";

	var watching = ["",server,api,middleware,utils].join(" --watch ");
	console.log('nodemon cli');
	console.log(watching);
	nodemon(watching+" "+server);
	resolve();
}

module.exports = function serveAsync(){
	return new Promise(startNodemonSync);
};
