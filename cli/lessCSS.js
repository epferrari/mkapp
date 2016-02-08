var less = require('less/lib/less-node');
var Promise = require('bluebird');
var fs = require('fs-extra');
var Autoprefixer = require('less-plugin-autoprefix');
var cleanCSS = require('less-plugin-clean-css');
var clc = require('cli-color');
var path = require('path');
var join = path.join;
var APP_ROOT = require('app-root-path').toString();
var config = require('./parse-config')();

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
		return Promise.reject("ERROR: Invalid context for lessCompile. Valid context arguments are `dev` and `dist`");
	}

	return Promise.all([
		compileCSS('public',targetDir,context),
		(config.CREATE_ADMIN_APP ? compileCSS('admin',targetDir,context) : Promise.resolve())
	]);
};


var pathToCssOutput = 'assets/css/main.css';


function compileCSS(scope,targetDir,context){
	console.log('compiling css for '+scope);

	var pathsToImports = [SRC_DIR+'/public/less'];

	if(config.CREATE_ADMIN_APP){
		pathsToImports.push(SRC_DIR+'/admin/less');
	}

	var autoprefixer = new Autoprefixer({browsers: ["last 2 versions"]});
	var plugins = [autoprefixer];
	if(context === 'dist' && config.COMPRESS_DIST_CSS){
		console.log('Minifying css for distribution. Turn this off by setting COMPRESS_DIST_CSS=false in mkapp_config.json');
		plugins.push(cleanCSS);
	}

	return fs.ensureFileAsync(join(APP_ROOT,targetDir,scope,pathToCssOutput))
	.then(function(file){
		var srcpath = join(APP_ROOT,SRC_DIR,scope,'less/main.less');
		return fs.readFileAsync(srcpath,{encoding:'utf-8'});
	})
	.then(function(data){
		return new Promise(function(resolve,reject){
			less.render(data,{
				filename: path.resolve('./main.less'),
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
		var outfile = join(APP_ROOT,targetDir,scope,pathToCssOutput);
		return fs.writeFileAsync(path.resolve(outfile),output.css);
	})
	.then(function(){
		console.log(clc.green('Successfully compiled LESS files for '+scope));
	})
	.catch(function(err){
		console.log(clc.red('There was an error compiling LESS files for '+scope));
		return Promise.reject(err);
	});
}
