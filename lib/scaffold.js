var Promise = require('bluebird');
var fs = require('fs');

Promise.promisifyAll(fs);

var mkdir = fs.mkdirAsync;
var clean = require('./mkapp-clean.js');

var dirs = [
	"/api",
	"/api/v1.0",
	"/admin",
	"/admin/assets",
	"/admin/assets/fonts",
	"/admin/assets/img",
	"/admin/assets/styles",
	"/client",
	"/client/assets",
	"/client/assets/fonts",
	"/client/assets/img",
	"/client/assets/styles",
	"/constants",
	"/middleware",
	"/modules",
	"/utils"
];


module.exports = function scaffold(root){
	return clean(root)
	.then(function(){
		return Promise.mapSeries(dirs,function(dirname){
			return mkdir(root+dirname);
		});
	});
}
