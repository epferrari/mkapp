var Promise = require('bluebird');
var fs = require('fs');
var clc = require('cli-color');
var join = require('path').join;
var APP_ROOT = require('app-root-path').toString();
var config = require(APP_ROOT + '/mkapp_config.json');

Promise.promisifyAll(fs);

var clean = require('./clean');

var dirs = [
	"admin",
	"admin/assets",
	"admin/assets/fonts",
	"admin/assets/img",
	"admin/assets/styles",
	"condux",
	"condux/admin",
	"condux/admin/frequencies",
	"condux/public",
	"condux/public/frequencies",
	"condux/server",
	"condux/server/channels",
	"public",
	"public/assets",
	"public/assets/fonts",
	"public/assets/img",
	"public/assets/styles",
	"server",
	"server/api",
	"server/api/v1.0",
	"middleware",
	"modules",
	"utils"
];


module.exports = function scaffold(dest){
	return clean(dest,true)
	.then(function(){
		return Promise.mapSeries(dirs,function(dirname){
			return fs.mkdirAsync(join(APP_ROOT,dest,dirname));
		});
	})
	.then(function(){
		console.log(clc.green('Successfully scaffolded '+dest));
	})
}
