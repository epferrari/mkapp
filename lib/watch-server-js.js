var watch = require('watch');
var Promise = require('bluebird');
var transpile = require('./mkapp-transpile.js');

var transpileDev = transpile.bind(Object.create(null),'dev');

module.exports = function(){
	watch.createMonitor('./src/server',function(monitor){
		monitor.on('created', transpileDev);
		monitor.on('changed', transpileDev);
		monitor.on('removed', transpileDev);
	});
	watch.createMonitor('./src/condux/server',function(monitor){
		monitor.on('created', transpileDev);
		monitor.on('changed', transpileDev);
		monitor.on('removed', transpileDev);
	});
};
