var Promise = require('bluebird');
var fs = require('fs');
var clc = require('cli-color');
var join = require('path').join;

Promise.promisifyAll(fs);

var mkdir = fs.mkdirAsync;
var clean = require('./clean');
var constants = require('./constants.js');

var __dist = constants.__dist;
var __dev = constants.__dev;

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


module.exports = function scaffold(root){
	if(!root){
		root = (process.env.NODE_ENV === 'production') ? __dist : __dev;
	}
	return clean(root,true)
	.then(function(){
		return Promise.mapSeries(dirs,function(dirname){
			return mkdir(join(root,dirname));
		});
	})
	.then(function(){
		console.log(clc.green('Successfully scaffolded '+root));
	})
}
