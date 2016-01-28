var Promise = require('bluebird');
var fs = require('fs');
var clc = require('cli-color');
var join = require('path').join;
var APP_ROOT = require('app-root-path').toString();

Promise.promisifyAll(fs);

var clean = require('./clean');

var dirs = [
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

var adminDirs = [
	"admin",
	"admin/assets",
	"admin/assets/fonts",
	"admin/assets/img",
	"admin/assets/styles"
];


module.exports = function scaffold(destDir,createAdmin){

	var _dirs = dirs.concat(createAdmin ? adminDirs : []);

	return clean(destDir,true)
	.then(function(){
		return Promise.mapSeries(_dirs,function(dirname){
			return fs.mkdirAsync(join(APP_ROOT,destDir,dirname));
		});
	})
	.then(function(){
		console.log(clc.green('Successfully scaffolded '+destDir));
	})
}
