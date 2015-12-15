var shell = require('shelljs');
var Promise = require('bluebird');
var clc = require('cli-color');
var yesOrNo = require('./promptAsync').yesOrNo;


function promptConfigOverwrite(){
	return new Promise(function(resolve,reject){
		if(shell.test('-f','./mkapp_config.json')){
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

function _copyBoilerplate(){
  return new Promise(function(resolve,reject){
    console.log('copying boilerplate files from local mkapp package...');
    var copiedFiles = shell.cp('-R','./node_modules/mkapp/boilerplate/*','./src');
    if(copiedFiles && copiedFiles.code !== 0){
      reject('could not copy boilerplate files from local mkapp package.');
    }else{
      console.log(clc.green('boilerplate project files copied to `.src` directory'));
      resolve();
    }
  });
}

function copyConfig(){
  return new Promise(function(resolve,reject){
    var copiedConfig = shell.cp('./node_modules/mkapp/mkapp_config.json','./');
    if(copiedConfig && copiedConfig.code !== 0){
      reject('unable to copy mkapp_config.json from boilerplate');
    }else{
      console.log(clc.green('mkapp_config.json copied to project root'));
      resolve();
    }
  });
}

module.exports = function copyBoilerplate(){
  return _copyBoilerplate()
    .then(promptConfigOverwrite)
    .then(copyConfig)
    .catch(function(err){
      if(err !== 'SKIP') return Promise.reject(err);
    });
}
