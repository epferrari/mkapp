var shell = require('shelljs');
var clc = require('cli-color');
var shell = require('shelljs');
var Promise = require('bluebird');

var scaffold = require('./scaffold.js');
var yesOrNo = require('./promptAsync.js').yesOrNo;

function overwriteConfig(resolve,reject){
	if(shell.test('-f','./config.js')){
		process.stdout.write('\x07');
		yesOrNo('Overwrite config.js?'.yellow,'N')
		.then(resolve)
		.catch(reject);
	}else{
		resolve();
	}
}

function overwriteProjectSrc(resolve,reject){

	if(shell.test('-d','./src')){
		process.stdout.write('\x07');
		yesOrNo('Overwrite ./src directory?'.yellow,'N')
		.then(resolve)
		.catch(reject);
	} else {
		resolve();
	}
}

function logErr(err){
	console.log(clc.red('An error occurred initializing app. Error: ' + err));
}

module.exports = function mkappInit(){
	console.log('Welcome to mkapp!')
	return new Promise(overwriteConfig)
	.then(function(){
		shell.cp('./node_modules/mkapp/config.js','./');
	})
	.catch(logErr)
	.finally(function(){
		return new Promise(overwriteProjectSrc);
	})
	.then(function(){
		return scaffold('./src');
	})
	.then(function(){
		console.log(clc.green('App scaffolding complete. Review the config.js file, then type ') + clc.white.bgGreen(' mkapp install '));
	})
	.catch(logErr);
}
