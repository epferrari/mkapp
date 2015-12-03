#!/usr/bin/env node

var mkapp;
var resolve = require('resolve');
try {
	mkapp = require( resolve.sync('mkapp',{basedir: process.cwd()}) );
	console.log('Using local mkapp');
}
catch(ex){
	console.log('Cannot find local mkapp, defaulting to global. \nInstall locally if you are experiencing dependency errors.\n---');
	mkapp = require('../lib/mkapp.js');
}

mkapp.parse(process.argv);
