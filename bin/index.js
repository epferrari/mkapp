#!/usr/bin/env node

var Promise = require('bluebird');
var clc = require('cli-color');
var mkapp = require('commander');

var scaffold = require('../lib/scaffold.js');
var go = require('../lib/mkapp-go.js');
var pkg = require('../package.json');

mkapp.version(pkg.version);

mkapp
	.command('new')
	.description('Create a new application with a boilerplate scaffold.')
	.action(scaffold);

mkapp
	.command('go [port]')
	.description('Build app and run at http://localhost:[port]')
	.action(function(port){
		go(port||3030);
	});

mkapp
	.command('build')
	.description('Build a minified distribution bundle of your app.')
	.action(function(){
		console.log('build command coming soon!')
	});

mkapp.command('dist <message> [branch]')
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
