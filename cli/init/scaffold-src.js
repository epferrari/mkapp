var Promise = require('bluebird');
var fs = require('fs');
var clc = require('cli-color');
var join = require('path').join;

var scaffold = require('../tasks/scaffold');
var paths = require('../tasks/scaffold/paths.json');

module.exports = function(options){

	options || (options = {})

	var dirs = [].concat(paths.core)
		.concat(paths.public.core)
		.concat(paths.public.src)
		.concat(paths.condux.core);

	if(options.createAdmin){
		dirs = dirs.concat(paths.admin.core)
			.concat(paths.admin.src)
			.concat(paths.condux.admin)
	}

	return scaffold(options.dest,dirs);
};
