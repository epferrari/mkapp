var Promise = require('bluebird');
var prompt = require('prompt');


function promptAsync(props,message){
	prompt.message = message;
	prompt.start();
	return new Promise(function(resolve,reject){
		prompt.get(props,function(err,result){
			err ? reject(err) : resolve(result);
		});
	});
};

module.exports.default = promptAsync;

module.exports.yesOrNo = function(message,_default){
	return new Promise(function(resolve,reject){

		var props = {
			name: 'yesOrNo',
			description: '[y/N]'.yellow,
			required: true,
			default: _default || 'Y',
			type: 'string',
			pattern: /^y|n$/i,
			message: 'valid responses are "y" or "n"'
		};

		return promptAsync(props,message)
		.then(function(result){
			if(result.yesOrNo.toLowerCase() === 'y'){
				resolve();
			}else{
				reject('Canceled');
			}
		});
	});
};
