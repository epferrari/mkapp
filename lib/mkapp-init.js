var shell = require('shelljs');
var clc = require('cli-color');
var shell = require('shelljs');
var Promise = require('bluebird');

var downloadBoilerplate = require('./download-boilerplate.js');
var installDeps = require('./install-dependencies.js');

var scaffold = require('./scaffold.js');
var yesOrNo = require('./promptAsync.js').yesOrNo;


function promptSrcOverwrite(resolve,reject){

	if(shell.test('-d','./src')){
		process.stdout.write('\x07');
		logAlert('Your src directory isn\'t empty, do you want to overwrite it?');
		return yesOrNo('Overwrite?'.yellow,'N')
		.then(resolve)
		.catch(function(){
			reject('SKIP');
		});
	} else {
		resolve();
	}
}

function logError(err){
	console.log(clc.red('An error occurred initializing app. Error: ' + err));
}

function logSuccess(msg){
	console.log(clc.green(msg));
}

function logAlert(msg){
	console.log(clc.yellow(msg));
}


module.exports = function mkappInit(version){
	console.log(clc.bold('Welcome to mkapp! This will walk you through project setup'));
	return new Promise(promptSrcOverwrite)
	.then(function(){
		return scaffold('./src');
	})
	.then(function(){
		return downloadBoilerplate(version);
	})
	.catch(function(err){
		if(err !== 'SKIP') return Promise.reject(err);
	})
	.then(installDeps)
	.then(function(setupComplete){
		if(setupComplete){
			logSuccess('App setup complete!');
			if(!shell.test('-f','./config.js')) {
				logAlert("Don't forget to create a config.js at your project root");
			}else{
				console.log(clc.green('Review the config.js file, then type ') + clc.white.bgGreen(' mkapp go '))
			}
		}
	})
	.catch(function(err){
		if(err === 'ABORT'){
			console.log('Setup Canceled');
		}else{
			logError(err);
		}
	});
}
