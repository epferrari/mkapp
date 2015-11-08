var shell = require('shelljs');
var Promise = require('bluebird');
var clc = require('cli-color');
var deps = require('./boilerplate-deps.json');
var yesOrNo = require('./promptAsync.js').yesOrNo;


function installAsync(name,ver){
	return new Promise(function(resolve,reject){

		var nameAndVersion = (/^git/.test(ver)) ? ver : name+'@'+ver;
		console.log('installing '+name+' '+ver+'...');
		var install = shell.exec('npm install '+nameAndVersion+' --save');

		if(install.code){
			console.log(clc.red('Failed to install '+name));
			reject(install.output);
		} else {
			console.log(clc.green.bold('Successfully installed '+name+' '+ver));
			resolve();
		}
	});
}



module.exports = function(){
	console.log(clc.yellow('You are about to npm install the boilerplate mkapp project\'s dependencies in your project\'s node_modules'));

	return yesOrNo('Proceed?','Y')
	.catch(function(){
		return Promise.reject('It is recommended that you install the bootstrap dependencies though mkapp');
	})
	.then(function(){
		console.log('installing dependencies from mkapp config. '+clc.bold('This may take some time...'));
	})
	.then(function(){
		if(!shell.test('-f','./config.js')) return Promise.reject('missing config file!');
		console.log('woot');
		/*
		return Promise.all(
			Object.keys(deps).map(function(name){
				return installAsync(name,deps[name]);
			})
		);
		*/
	});
};
