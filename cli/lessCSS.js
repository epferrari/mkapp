var less = require('less/lib/less-node');
var Promise = require('bluebird');
var fs = require('fs-extra');
var Autoprefixer = require('less-plugin-autoprefix');
var cleanCSS = require('less-plugin-clean-css');
var clc = require('cli-color');
var path = require('path');
var join = path.join;
var APP_ROOT = require('app-root-path').toString();
var config = require(APP_ROOT + '/mkapp_config.json');

var SRC_DIR = config.SRC_DIR;
var DEV_DIR = config.DEV_DIR;
var DIST_DIR = config.DIST_DIR;

Promise.promisifyAll(fs);


module.exports = function(context){
	var targetDir;
	if(context === 'dev'){
		targetDir = DEV_DIR;
	}else if(context === 'dist'){
		targetDir = DIST_DIR;
	}else{
		return Promise.reject("ERROR: valid arguments to lessCompile are `dev` and `dist`");
	}

	return Promise.all([
		compileCSS('public',targetDir),
		compileCSS('admin',targetDir)
	]);
};


var pathToCssOutput = 'assets/styles/styles.css';

var pathsToImports = [
	SRC_DIR+'/admin/styles',
	SRC_DIR+'/public/styles'
];


function compileCSS(context,targetDir){

	var autoprefixer = new Autoprefixer({browsers: ["last 2 versions"]});
	var plugins = [autoprefixer];
	if(process.env.NODE_ENV === 'production') plugins.push(cleanCSS);

	console.log('compiling css for '+context);

	return fs.ensureFileAsync(join(APP_ROOT,targetDir,context,pathToCssOutput))
	.then(function(file){
		var srcpath = join(APP_ROOT,SRC_DIR,context,'styles/styles.less');
		return fs.readFileAsync(srcpath,{encoding:'utf-8'});
	})
	.then(function(data){
		return new Promise(function(resolve,reject){
			less.render(data,{
				filename: path.resolve('./styles.less'),
				paths: pathsToImports.map(function(p){return path.resolve(p)}),
				plugins: plugins,
				relativeUrls: false
			},function(err,output){
				if(err){
					reject(err)
				}else{
					resolve(output)
				}
			})
		});
	})
	.then(function(output){
		var outfile = join(APP_ROOT,targetDir,context,pathToCssOutput);
		return fs.writeFileAsync(path.resolve(outfile),output.css);
	})
	.then(function(){
		console.log(clc.green('Successfully compiled LESS files for '+context));
	})
	.catch(function(err){
		console.log(clc.red('There was an error compiling LESS files for '+context));
		return Promise.reject(err);
	});
}
