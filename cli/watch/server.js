var watch = require('watch');
var Promise = require('bluebird');
var transpile = require('../transpile');

var transpileDev = transpile.bind(Object.create(null),'dev');

module.exports = watchServer;

function watchServer(){
  return new Promise(function(resolve){
    watch.createMonitor('./src/server',function(monitor){
      monitor.on('created', transpileDev);
      monitor.on('changed', transpileDev);
      monitor.on('removed', transpileDev);
    });
    watch.createMonitor('./src/condux/server',function(monitor){
      monitor.on('created', transpileDev);
      monitor.on('changed', transpileDev);
      monitor.on('removed', transpileDev);
    });
    resolve();
  });
}
