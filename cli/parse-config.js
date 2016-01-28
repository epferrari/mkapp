var fs = require('fs');
var join = require('path').join;
var APP_ROOT = require('app-root-path').toString();
var CONFIG_PATH = join(APP_ROOT,'/mkapp_config.json');

module.exports = function parseConfig(){
	var config = require(CONFIG_PATH);
	var shouldWrite = false;

	if(!config.SRC_DIR || !(/^\.\/[^/]+$/.test(config.SRC_DIR))){
		config.SRC_DIR = './src';
		shouldWrite = true;
	}
	if(!config.DEV_DIR || !(/^\.\/[^/]+$/.test(config.DEV_DIR))){
		config.DEV_DIR = './dev';
		shouldWrite = true;
	}
	if(!config.DIST_DIR || !(/^\.\/[^/]+$/.test(config.DIST_DIR))){
		config.DIST_DIR = './dist';
		shouldWrite = true;
	}
	if(!config.PORT || isNaN(config.PORT) || config.PORT.length < 4){
		config.PORT = 5000;
		shouldWrite = true;
	}
	if(!config.API_SERVER || !config.API_SERVER.length){
		config.API_SERVER = 'localhost';
		shouldWrite = true;
	}
	if(!config.CONDUX_SERVER || !config.CONDUX_SERVER.length){
		config.CONDUX_SERVER = 'localhost';
		shouldWrite = true;
	}
	if(typeof config.CREATE_ADMIN_APP !== 'boolean'){
		config.CREATE_ADMIN_APP = true;
		shouldWrite = true;
	}
	if(typeof config.COMPRESS_DIST_CSS !== 'boolean'){
		config.COMPRESS_DIST_CSS = true;
		shouldWrite = true;
	}

	if(shouldWrite) fs.writeFileAsync(CONFIG_PATH,JSON.stringify(config));

	return config;
}
