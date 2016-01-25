var shell = require('shelljs');
var Promise = require('bluebird');
var clc = require('cli-color');
var promptAsync = require('./promptAsync');
var yesOrNo = promptAsync.yesOrNo;
var fs = require('fs');
var merge = require('lodash').merge;
var join = require('path').join;

Promise.promisifyAll(fs);

var APP_ROOT = require('app-root-path').toString();
var CONFIG_PATH = join(APP_ROOT,'./mkapp_config.json');

function promptConfigOverwrite(){
	return new Promise(function(resolve,reject){

		if(shell.test('-f',CONFIG_PATH)){
			process.stdout.write('\x07');
			console.log(clc.yellow('A mkapp_config.json file already exists in your project. Overwrite it?'));
			yesOrNo('Overwrite mkapp_config.json?'.yellow,'N')
				.then(resolve)
				.catch(function(err){
					return reject('SKIP');
				});
		}else{
			resolve();
		}
	});
}

function copyConfigFile(){
	return new Promise(function(resolve,reject){
		var pathToDefaultConfig = join(APP_ROOT,'./node_modules/mkapp/mkapp_config.json');
		var copiedConfig = shell.cp(pathToDefaultConfig,APP_ROOT);
		if(copiedConfig && copiedConfig.code !== 0){
			reject('unable to copy mkapp_config.json from mkapp package');
		}else{
			console.log(clc.green('mkapp_config.json copied to project root'));
			resolve();
		}
	});
}


module.exports = function configure(){

	var config;
	var defaultConfig = {
		CONDUX_SERVER: "localhost",
		API_SERVER: "localhost",
		PORT: 3030,
		SRC_DIR: './src',
		DEV_DIR: './dev',
		DIST_DIR: './dist'
	};

	return promptConfigOverwrite()
		.then(copyConfigFile)
		.catch(function(err){
			if(err === 'SKIP'){
				// we were just skipping an overwrite
				return Promise.resolve();
			}else{
				// a real error occured
				return Promise.reject(err);
			}
		})
		.then(function(){
			return fs.readFileAsync(CONFIG_PATH,'utf-8');
		})
		.then(function(data){
			config = merge({},defaultConfig,JSON.parse(data));
		})
		.then(function(){
			console.log(clc.green('Please review project configuration'));
			return promptAsync.default([
				{
					name: 'SRC_DIR',
					description: 'Directory for source files',
					type: 'string',
					pattern: /^\.\/.*[^\/]$/,
					message: 'Directory name must begin with `./` and should not end with `/`',
					default: config.SRC_DIR,
					required: true
				},{
					name: 'DEV_DIR',
					description: 'Development directory',
					type: 'string',
					pattern: /^\.\/.*[^\/]$/,
					message: 'Directory name must begin with `./` and should not end with `/`',
					default: config.DEV_DIR,
					required: true
				},{
					name: 'DIST_DIR',
					description: 'Distribution directory',
					type: 'string',
					pattern: /^\.\/.*[^\/]$/,
					message: 'Directory name must begin with `./` and should not end with `/`',
					default: config.DIST_DIR,
					required: true
				},{
					name: 'CONDUX_SERVER',
					description: "Host for Condux Server",
					type: 'string',
					pattern: '^.*$',
					default: config.CONDUX_SERVER,
					required: true
				},{
					name: 'API_SERVER',
					description: "Host for API server",
					type: 'string',
					pattern: '^.*$',
					default: config.API_SERVER,
					required: true
				},{
					name: 'PORT',
					description: "Port",
					type: 'number',
					pattern: '^\d*$',
					default: config.PORT,
					required: true
				}
			])
		})
		.then(function(result){
			config = merge({},config,result);
			return fs.writeFileAsync(CONFIG_PATH,JSON.stringify(config));
		});
}
