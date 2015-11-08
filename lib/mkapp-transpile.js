var Promise = require('bluebird');
var babel = require('babel-core');
var glob = require('glob');
var flatten = require('lodash').flatten;
var fs = require('fs-extra');
var clc = require('cli-color');

var globAsync = Promise.promisify(glob);
Promise.promisifyAll(fs,{context:fs});

function transformFileAsync(file){
	var babelOptions = {
		presets: ['es2015'],
		plugins: ['transform-es2015-modules-commonjs']
	};
	return Promise.promisify(babel.transformFile,{context:babel})(file,babelOptions);
}


module.exports = function transpile(dest){
	console.log('transpiling server javascript to %s',dest);
	return Promise.all([
		globAsync('./src/server/api/**/*.js'),
		globAsync('./src/server/middleware/**/*.js'),
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
				return fs.writeFileAsync(outfile,result.code);
			});
		});
	})
	.then(function(){
		return transformFileAsync('./src/server/index.js');
	})
	.then(function(result){
		return fs.writeFileAsync("./"+dest+"/server/index.js",result.code);
	})
	.then(function(){
		var msg = 'transpilation complete!';
		console.log(clc.green(msg));
	});
};
