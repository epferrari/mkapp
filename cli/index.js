var Promise = require('bluebird');
var clc = require('cli-color');
var resolve = require('resolve');

var mkapp = require('commander');

var init = require('./init');
var go = require('./go');
var clean = require('./clean');
var transpile = require('./transpile');
var bundler = require('./bundler');
var pkg = require('../package.json');


/* mkapp CLI */

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
	.command('transpile <dest>')
	.description('Transpile ES6 modules in your server app')
	.action(function(dest){
		transpile(dest)
		.then(function(){
			process.exit(0);
		})
		.catch(function(err){
			console.log(clc.red(err));
			process.exit(1);
		});
	});

mkapp
	.command('bundle <context>')
	.description('create your app\'s javascript bundle in the dev directory. Valid arguments for context are "admin" or "public"')
	.action(function(context){
		bundler(context)()
		.then(function(){
			process.exit(0);
		})
		.catch(function(err){
			console.log(clc.red(err));
			process.exit(1);
		});
	});

mkapp
	.command('go')
	.alias('dev')
	.description('Build app and run in a local dev environment at http://localhost:<PORT>, where PORT is defined in mkapp_config.json')
	.action(function(){
		go()
		.catch(function(err){
			console.log(clc.red.bold('Zoiks, something went horribly wrong. Better fetch a bucket...'));
			console.log(clc.red(err));
			process.exit(1);
		});
	});

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