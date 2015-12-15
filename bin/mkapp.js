#!/usr/bin/env node

var mkapp;
var resolve = require('resolve');

try {
	mkapp = require( resolve.sync('mkapp',{basedir: process.cwd()}) );
	console.log('Using local mkapp');
}
catch(ex){
	console.log('Cannot find local mkapp, defaulting to global. \nInstall locally if you experience dependency issues.\n---');
	mkapp = require('../index.js');
}

mkapp.parse(process.argv);
