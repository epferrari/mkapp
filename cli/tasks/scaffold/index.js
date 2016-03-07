var Promise = require('bluebird');
var fs = require('fs');
var clc = require('cli-color');
var join = require('path').join;
var APP_ROOT = require('app-root-path').toString();

Promise.promisifyAll(fs);

var clean = require('../clean');

module.exports = function scaffold(destDir,paths){
	return clean(destDir,true)
	.then(function(){
		return Promise.mapSeries(paths,function(p){
			return fs.mkdirAsync(join(APP_ROOT,destDir,p));
		});
	})
	.then(function(){
		console.log(clc.green('Successfully scaffolded '+destDir));
	})
	.catch(function(err){
		console.log(clc.red('Error scaffolding directory '+destDir))
		return Promise.reject(err);
	})
};
