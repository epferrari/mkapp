var Promise = require('bluebird');
var clc = require('cli-color');
var ghd = require('github-download');
var AdmZip = require('adm-zip');
var shell = require('shelljs');
var yesOrNo = require('../promptAsync.js').yesOrNo;
var join = require('path').join;
var APP_ROOT = require('app-root-path').toString();
var CONFIG_PATH = join(APP_ROOT,'/mkapp_config.json');

var fs = Promise.promisifyAll(require('fs-extra'));
var ncp = Promise.promisify(require('ncp').ncp);
var remote = 'https://github.com/epferrari/mkapp.git';
var tmpfile = join(APP_ROOT,'./tmp.zip');
var tmpdir = join(APP_ROOT,'./tmp');

// constants to pass through the promise chain on errors
var passthru = require('./constants.json');


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
			(done && done.code !== 0 ) ? reject() : resolve();
		})
		.on('error',reject);
	});
}

function continueOrAbort(){
	return yesOrNo('Continue?','N')
	.catch(function(err){
		return Promise.reject(passthru.ABORT);
	});
}

function reportIssue(err){
	return err + ' -- Report issues at https://github.com/epferrari/mkapp/issues.'
}

module.exports = function downloadBoilerplate(installDir,installedMkappVersion){
	installDir = join(APP_ROOT,installDir);
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
			return Promise.reject(passthru.SKIP);
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
			console.log('...copying extracted files to '+installDir);
			return ncp(tmpdir+'/mkapp-master/boilerplate',installDir);
		})
		.then(function(){
			console.log(clc.green("Download complete"));
		})
		.catch(function(err){
			if(err === passthru.SKIP){
				return Promise.reject(passthru.SKIP);
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
				return Promise.reject(passthru.PROMPT);
			}
		})
		.catch(function(err){
			if(err === passthru.SKIP){
				return Promise.reject(passthru.SKIP);
			}else if(err === passthru.PROMPT){
				console.warn('Your version of mkapp may be out of date. You should exit and run npm update mkapp -g');
				return continueOrAbort();
			}else{
				console.log(clc.red('No remote manifest found. Ensure https://github.com/epferrari/mkapp.git is a valid repository.'));
				return continueOrAbort();
			}
		})
		.finally(function(){
			shell.test('-d',tmpdir) && shell.rm('-rf',tmpdir);
			shell.test('-f',tmpfile) && shell.rm(tmpfile);
		});
};
