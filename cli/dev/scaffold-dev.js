var Promise = require('bluebird');
var fs = require('fs');
var clc = require('cli-color');
var join = require('path').join;

var scaffold = require('../scaffold');
var paths = require('../scaffold/paths.json');

module.exports = function(){

	var config = require('../parse-config')();

	var dirs = [].concat(paths.core)
		.concat(paths.public.core)
		.concat(paths.public.build)
		.concat(paths.condux.core);

	if(config.CREATE_ADMIN_APP){
		dirs = dirs.concat(paths.admin.core)
			.concat(paths.admin.build)
			.concat(paths.condux.admin)
	}

	return scaffold(config.DEV_DIR,dirs);
};
