var Promise = require('bluebird');
var fs = require('fs');
var clc = require('cli-color');
var join = require('path').join;

Promise.promisifyAll(fs);

var mkdir = fs.mkdirAsync;
var clean = require('./mkapp-clean.js');
var constants = require('./constants.js');

var __dist = constants.__dist;
var __dev = constants.__dev;

var dirs = [
	"api",
	"api/v1.0",
	"admin",
	"admin/assets",
	"admin/assets/fonts",
	"admin/assets/img",
	"admin/assets/styles",
	"client",
	"client/assets",
	"client/assets/fonts",
	"client/assets/img",
	"client/assets/styles",
	"constants",
	"middleware",
	"modules",
	"utils"
];


module.exports = function scaffold(root){
	if(!root){
		root = (process.env.NODE_ENV === 'production') ? __dist : __dev;
	}
	return clean(root)
	.then(function(){
		return Promise.mapSeries(dirs,function(dirname){
			return mkdir(join(root,dirname));
		});
	})
	.then(function(){
		console.log(clc.green('Successfully scaffolded '+root));
	})
}
