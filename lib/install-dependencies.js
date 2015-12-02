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
			console.log(clc.green('Successfully installed '+name+' '+ver));
			resolve();
		}
	});
}



module.exports = function(){
	console.log(clc.yellow('You are about to npm install a boilerplate mkapp project\'s dependencies in your project\'s node_modules'));
	console.log(clc.yellow('This could take some time. You may want to grab a snack,'));
	// prompt
	return yesOrNo('Proceed?','Y')
	.then(function(){
		console.log('installing dependencies from mkapp config... ');
	})
	.catch(function(){
		console.log(clc.yellow('It is recommended that you install the project\'s bootstrap dependencies though mkapp'));
		// reprompt
		return yesOrNo('Install the dependecies now?','Y');
	})
	.then(function(){
		console.log('...installing');
		return Promise.all(
			Object.keys(deps).map(function(name){
				return installAsync(name,deps[name]);
			})
		);
	})
	.then(function(){
		return Promise.resolve(true);
	})
	.catch(function(){
		console.log(clc.yellow('Dependency installation skipped. Your app may blow up in your face. You have been warned.'));
		return Promise.resolve(false);
	});
};
