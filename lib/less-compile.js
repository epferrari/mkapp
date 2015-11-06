var less = require('less');
var Promise = require('bluebird');
var fs = require('fs-extra');
var Autoprefixer = require('less-plugin-autoprefix');
var cleanCSS = require('less-plugin-clean-css');
var clc = require('cli-color');
var path = require('path');
var join = path.join;
var constants = require('./constants.js');

Promise.promisifyAll(fs);

//var renderAsync = Promise.promisify(less.render,{context: less});
var pathToCssOutput = 'assets/styles/styles.css';

module.exports = function(){
	return Promise.all([
		compileCSS('client'),
		compileCSS('admin')
	]);
};

var pathsToImports = [
	'./src/admin/styles',
	'./src/client/styles'
];

function compileCSS(ctx){
	var production = (process.env.NODE_ENV === 'production');
	var root = production ? constants.__dist : constants.__dev;
	var autoprefixer = new Autoprefixer({browsers: ["last 2 versions"]});
	var plugins = [autoprefixer];
	if(production) plugins.push(cleanCSS);

	console.log('compiling css for '+ctx);

	return fs.ensureFileAsync(join(root,ctx,pathToCssOutput))
	.then(function(file){
		var srcpath = join(constants.__src,ctx,'styles/styles.less');
		return fs.readFileAsync(srcpath,{encoding:'utf-8'});
	})
	.then(function(data){
		var srcpath = join(constants.__src,ctx,'styles/styles.less');
		return new Promise(function(resolve,reject){
			less.render(data,{
				filename: path.resolve('./styles.less'),
				paths: pathsToImports.map(function(p){return path.resolve(p)}),
				plugins: plugins,
				relativeUrls: false
			},function(err,output){
				if(err) reject(err)
				else resolve(output)
			})
		});
	})
	.then(function(output){
		var outfile = join(root,ctx,pathToCssOutput);
		return fs.writeFileAsync(path.resolve(outfile),output.css);
	})
	.then(function(){
		console.log(clc.green('Successfully compiled LESS files for '+ctx));
	})
	.catch(function(err){
		console.log(clc.red('There was an error compiling LESS files for '+ctx));
		return Promise.reject(err);
	});
}
