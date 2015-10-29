#!/usr/bin/env node

var Promise = require('bluebird');
var clc = require('cli-color');
var opener = require('opener');
var mkapp = require('commander');

var scaffold = require('../lib/scaffold.js');
var lint = require('../lib/lint.js');
var startNodemon = require('../lib/startNodemon.js');
var watchJS = require('../lib/watchJS.js');
var transpile = require('../lib/transpile.js');
var pkg = require('../package.json');

mkapp.version(pkg.version);

mkapp
	.command('new')
	.description('Create a new application with a boilerplate scaffold.')
	.action(function(){
		scaffold();
	});

mkapp
	.command('go [port]')
	.description('Build app and run at http://localhost:[port]')
	.action(function(port){
		go(port||3030);
	});

mkapp.parse(process.argv);


function go(port){
	lint("./src")
	.then(watchJS)
	.then(function(){
		return transpile('dev');
	})
	.then(startNodemon)
	.then(function(){
		opener('http://localhost:'+port+'/admin');
		opener('http://localhost:'+port+'/app');
	})
	.catch(function(err){
		console.log(clc.red.bold('Erroneous!'));
		console.log(clc.red(err));
	});
}
