var Promise = require('bluebird');
var clc = require('cli-color');
var mkapp = require('commander');

var init = require('./mkapp-init.js');
var go = require('./mkapp-go.js');
var clean = require('./mkapp-clean.js');
var transpile = require('./mkapp-transpile.js');
var pkg = require('../package.json');

mkapp.version(pkg.version);


mkapp
	.command('new')
	.description('Create a new application with a directory scaffold, download boilerplate project, and install dependencies.')
	.action(function(){
		init(pkg.version);
	});

mkapp
	.command('clean <dir>')
	.description('Remove a directory and its contents with rm -rf <dir>')
	.action(function(dir){
		clean(dir);
	});

mkapp
	.command('transpile')
	.description('Transpile ES6 modules in your server app')
	.action(transpile);

mkapp
	.command('go')
	.description('Build app and run at http://localhost:<process.env.PORT>. Defaults to 3030')
	.action(go);

mkapp
	.command('build')
	.description('Build a minified distribution bundle of your app.')
	.action(function(){
		console.log('build command coming soon!')
	});

mkapp
	.command('dist <message> [branch]')
	.description('build, commit, and push your app to <branch> '+
		'of your repository. If <branch> is left blank, the bundle '+
		'will be commited to `origin development`')
	.action(function(message,branch){
		if(!message){
			console.log(clc.red('Must specify a commit message'));
		}else{
			console.log('dist command coming soon!');
		}
	});

module.exports = mkapp;
