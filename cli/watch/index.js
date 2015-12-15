var watchClient = require('./client');
var watchServer = require('./server');
var Promise = require('bluebird')

module.exports = watch;

function watch(){
  return Promise.all([
    watchClient('admin'),
    watchClient('public'),
    watchServer()
  ]);
}
