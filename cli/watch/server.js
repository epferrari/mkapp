var watch = require('watch');
var Promise = require('bluebird');
var transpile = require('../transpile');
var APP_ROOT = require('app-root-path').toString();
var join = require('path').join;
var transpileDev = transpile.bind(Object.create(null),'dev');

module.exports = watchServer;

function watchServer(){
	var SRC_DIR = require('../parse-config')().SRC_DIR;

	return new Promise(function(resolve){
		var appServer = join(APP_ROOT,SRC_DIR,'/server');
		var conduxServer = join(APP_ROOT,SRC_DIR,'/condux/server');

		watch.createMonitor(appServer,function(monitor){
			monitor.on('created', transpileDev);
			monitor.on('changed', transpileDev);
			monitor.on('removed', transpileDev);
		});
		watch.createMonitor(conduxServer,function(monitor){
			monitor.on('created', transpileDev);
			monitor.on('changed', transpileDev);
			monitor.on('removed', transpileDev);
		});

		resolve();
	});
}
