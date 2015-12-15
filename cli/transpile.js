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


module.exports = transpile;

/**
*
* @param {string} context One of ['dev','dist']
* @returns {Promise}
*/
function transpile(context){

	if(["dev","dist"].indexOf(context) === -1) return contextError();

	console.log('transpiling server javascript to %s',context);
	return Promise.all([
		globAsync('./src/server/api/**/*.js'),
		globAsync('./src/condux/**/*.js'),
		globAsync('./src/middleware/**/*.js'),
		globAsync('./src/utils/**/*.js')
	])
	.then(function(files){
		return flatten(files,true);
	})
	.map(function(fileName){
		var outfile = fileName.replace('src',context); // context filename
		var transformed = transformFileAsync(fileName); // babelified file
		var ensured = fs.ensureFileAsync(outfile);
		return Promise.join(outfile,transformed,ensured,function(outfile,transformed){
			return {
				dest: outfile,
				contents: transformed.code
			};
		});
	})
	.map(function(file){
		return fs.writeFileAsync(file.dest,file.contents);
	})
	.then(function(){
		return transformFileAsync('./src/server/index.js');
	})
	.then(function(result){
		return fs.writeFileAsync("./"+context+"/server/index.js",result.code);
	})
	.then(function(){
		var msg = 'transpilation complete!';
		console.log(clc.green(msg));
	});
};

function contextError(){
	return Promise.reject('Invalid context argument passed to `transpile`. Valid contexts are "dev" or "dist"');
}
