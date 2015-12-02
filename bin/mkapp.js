#!/usr/bin/env node

var resolve = require('resolve');
console.log( resolve.sync('bluebird',{basedir: process.cwd()}) );
console.log( resolve.sync('babel',{basedir: process.cwd()}) );
try {
	console.log( resolve.sync('cli-color',{basedir: process.cwd()}) );
	console.log( resolve.sync('mkapp',{basedir: process.cwd()}) );
}
catch(ex){
	console.log('error finding modules');
}


var Promise = require('bluebird');
var clc = require('cli-color');
var mkapp = require('commander');

var init = require('../lib/mkapp-init.js');
var go = require('../lib/mkapp-go.js');
var clean = require('../lib/mkapp-clean.js');
var transpile = require('../lib/mkapp-transpile.js');
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


mkapp.parse(process.argv);
