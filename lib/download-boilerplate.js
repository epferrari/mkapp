var Promise = require('bluebird');
var clc = require('cli-color');
var __src = require('./constants.js').__src;
var ghd = require('github-download');
var AdmZip = require('adm-zip');
var shell = require('shelljs');
var yesOrNo = require('./promptAsync.js').yesOrNo;

var fs = Promise.promisifyAll(require('fs-extra'));
var ncp = Promise.promisify(require('ncp').ncp);
var remote = 'https://github.com/epferrari/mkapp.git';
var tmpfile = './tmp.zip';
var tmpdir = './tmp';

var SKIP = 'SKIP';
var PROMPT = 'PROMPT';
var ABORT = 'ABORT';

function promptConfigOverwrite(){
	return new Promise(function(resolve,reject){
		if(shell.test('-f','./config.js')){
			process.stdout.write('\x07');
			console.log(clc.yellow('A config.js file already exists in your project. Overwrite i?'));
			yesOrNo('Overwrite config.js?'.yellow,'N')
				.then(resolve)
				.catch(function(err){
					return reject('SKIP');
				});
		}else{
			resolve();
		}
	});
}

function promptBoilerplateDownload(){
	process.stdout.write('\x07');
	console.log(clc.bold('mkapp needs to download boilerplate project files from git.'));
	return yesOrNo('Download?'.green,'Y');
}


function ghdAsync(url,outdir){
	return new Promise(function(resolve,reject){
		ghd(url,outdir)
		.on('zip',function(zipUrl){
			var done = shell.exec('curl '+zipUrl+' > '+tmpfile);
			if( !done || done.code ) ? reject() : resolve();
		})
		.on('error',reject);
	});
}

function continueOrAbort(){
	return yesOrNo('Continue?','N')
	.catch(function(err){
		return Promise.reject(ABORT);
	});
}

function reportIssue(err){
	return err + ' -- Report issues at https://github.com/epferrari/mkapp/issues.'
}

module.exports = function downloadBoilerplate(installedMkappVersion){

	return promptBoilerplateDownload()
		.then(function(){
			console.log('downloading boilerplate files from remote...');
			return fs.ensureDirAsync(tmpdir);
		})
		.catch(function(){
			console.log(clc.yellow('It is recommended that you download the boilerplate project.'))
			return yesOrNo('Download?'.green,'Y');
		})
		.catch(function(){
			console.log('...skipping download');
			return Promise.reject(SKIP);
		})
		.then(function(){
			console.log('downloading boilerplate files from remote...');
			return fs.ensureDirAsync(tmpdir);
		})
		.then(function(){
			return ghdAsync(remote);
		})
		.then(function(){
			console.log('...extracting files to '+tmpdir);
			var zip = new AdmZip(tmpfile);
			zip.extractAllTo(tmpdir);
		})
		.then(function(){
			console.log('...copying extracted files to '+__src);
			return ncp(tmpdir+'/mkapp-master/boilerplate',__src);
		})
		.then(function(){
			console.log(clc.green("Download complete"));
		})
		.catch(function(err){
			if(err === SKIP){
				return Promise.reject(SKIP);
			} else {
				var msg = "An error occured downloading files. "+ err;
				return Promise.reject(msg);
			}
		})
		.then(function(){
			return fs.readFileAsync(tmpdir+'/mkapp-master/package.json','utf-8');
		})
		.then(function(file){
			var pkg = JSON.parse(file.toString());
			return Promise.resolve(pkg.version);
		})
		.then(function(version){
			if(version !== installedMkappVersion){
				return Promise.reject(PROMPT);
			}
		})
		.catch(function(err){
			if(err === SKIP){
				return Promise.reject(SKIP);
			}else if(err === PROMPT){
				console.warn('Your version of mkapp may be out of date. You should exit and run npm update mkapp -g');
				return continueOrAbort();
			}else{
				console.log(clc.red('No remote manifest found. Ensure https://github.com/epferrari/mkapp.git is a valid repository.'));
				return continueOrAbort();
			}
		})
		.then(promptConfigOverwrite)
		.then(function(){
			var reason;
			return new Promise(function(resolve,reject){
				if(!shell.test('-f',tmpdir+'/mkapp-master/config.js')){
					reason = reportIssue('No config file found in downloaded project.')
					reject(reason);
					return;
				}
				var copied = shell.cp(tmpdir+'/mkapp-master/config.js','./');
				if(!copied || copied.code){
					reason = reportIssue('could not copy config.js to src directory.');
					reject(reason);
				}else{
					resolve();
				}
			});
		})
		.then(function(){
			if(!shell.test('-f','./config.js')){
				var msg = "Config file not present! You MUST create a config.js file in your project root. See documentation for example.";
				console.log(clc.red(msg));
				console.log('...continuing. Don\'t forget to create this file before developing');
			}else{
				console.log('...continuing with present config.js');
			}
		})
		.finally(function(){
			shell.test('-d',tmpdir) && shell.rm('-rf',tmpdir);
			shell.test('-f',tmpfile) && shell.rm(tmpfile);
		});
};
