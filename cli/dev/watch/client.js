var join = require('path').join;
var createBundler = require('../../create-bundler');
var lint = require('../../lint');
var APP_ROOT = require('app-root-path').toString();


module.exports = watchClient;

/**
*
* @param {string} scope One of ['public','admin']
* @returns {Promise} bundle()
*/
function watchClient(scope){

	var SRC_DIR = require('../../parse-config')().SRC_DIR;
	// create a bundler function with destination scope and rebundle on update
	var bundle = createBundler(scope,rebundle);

	// run linting again before re-bundling files
	function rebundle(){
		console.log("a javascript file changed in "+scope+"!");
		return lint(join(APP_ROOT,SRC_DIR,scope))
			.then(bundle);
	}

	return bundle();
}
