var Promise = require('bluebird');
var nodemon = require('nodemon');
var APP_ROOT = require('app-root-path').toString();
var join = require('path').join;
var CONFIG_PATH = join(APP_ROOT,'./mkapp_config.json');

function startNodemon(resolve){
		var DEV_DIR = require(CONFIG_PATH).DEV_DIR;

		console.log('nodemon cli');

		var watching = [
			join(DEV_DIR,"/server/index.js"),
			join(DEV_DIR,"/server/api"),
			join(DEV_DIR,"/server/middleware"),
			join(DEV_DIR,"/utils")
		]
		.map(function(path){
			console.log('watching '+ path);
			return "--watch " + join(APP_ROOT,path);
		})
		.join(" ");

		nodemon(watching+" "+ join(APP_ROOT,DEV_DIR,"/server/index.js"));
		resolve();
}

module.exports = function serveAsync(){
	return new Promise(startNodemon);
};
