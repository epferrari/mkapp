var Promise = require('bluebird');
var babel = require('babel');
var glob = require('glob');
var flatten = require('lodash').flatten;
var fs = require('fs');
var clc = require('cli-color');

var globAsync = Promise.promisify(glob);
var writeFileAsync = Promise.promisify(fs.writeFile,{context:fs});
var transformFileAsync = Promise.promisify(babel.transformFile,{context:babel});

module.exports = function transpile(dest){
	console.log('transpiling server javascript to %s',dest);
	return Promise.all([
		globAsync('./src/api/**/*.js'),
		globAsync('./src/middleware/**/*.js'),
		globAsync('./src/utils/**/*.js')
	])
	.then(function(files){
		return flatten(files,true);
	})
	.then(function(fileNames){
		return Promise.map(fileNames,function(f){
			var outfile = f.replace('src',dest); // dest filename
			return transformFileAsync(f)
			.then(function(result){
				return writeFileAsync(outfile,result.code);
			});
		});
	})
	.then(function(){
		return transformFileAsync('./src/index.js');
	})
	.then(function(result){
		return writeFileAsync("./"+dest+"/index.js",result.code);
	})
	.then(function(){
		var msg = 'transpilation complete!';
		console.log(clc.green(msg));
	});
};
