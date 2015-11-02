var Promise = require('bluebird');
var fs = require('fs-extra');
var clc = require('cli-color');

Promise.promisifyAll(fs);

function clean(path){
	return fs.emptyDirAsync(path)
	.then(function(){
		var msg = "Cleaned directory "+path;
		console.log(clc.green(msg));
	})
	.catch(function(err){
		var msg = "Could not clean directory: "+path;
		var reason = "Error: "+err;
		console.log(clc.red(msg));
		Promise.reject(reason);
	});
}

module.exports = clean;
