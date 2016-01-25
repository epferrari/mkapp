var join = require('path').join;
var bundler = require('../bundler');
var lint = require('../lint');
var APP_ROOT = require('app-root-path').toString();
var SRC_DIR = require(APP_ROOT + '/mkapp_config.json').SRC_DIR;

module.exports = watchClient;

/**
*
* @param {string} context One of ['public','admin']
* @returns {Promise} bundle()
*/
function watchClient(context){

	// create a bundler function with destination context and rebundle on update
	var bundle = bundler(context,rebundle);

	// run linting again before re-bundling files
	function rebundle(){
		console.log("a javascript file changed!");
		return lint(join(APP_ROOT,SRC_DIR,context))
			.then(bundle);
	}

	return bundle();
}
