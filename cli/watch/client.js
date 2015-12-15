var join = require('path').join;

var bundler = require('../bundler');
var lint = require('../lint');
var __src = require('../constants').__src;

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
    return lint(join(__src,context))
      .then(bundle);
  }

  return bundle();
}
