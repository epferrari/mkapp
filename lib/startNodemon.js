var Promise = require('bluebird');
var __dev = require('./constants.js').__dev;
var nodemon = require('nodemon');

function startNodemonSync(resolve){
	var index = __dev+"/index.js";
	var api = __dev+"/api";
	var middleware = __dev+"/middleware";
	var utils = __dev+"/utils";

	var watching = ["",index,api,middleware,utils].join(" --watch ");
	console.log('watching for changes in %s',watching);
	nodemon(watching+" "+index);
	resolve();
}

module.exports = function startNodemonAsync(){
	return new Promise(startNodemonSync);
};
