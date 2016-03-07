var watchClient = require('./client');
var watchServer = require('./server');
var Promise = require('bluebird');

module.exports = watch;

function watch(){

	var config = require('../../utilities/parse-config')();

	return Promise.all([
		(config.CREATE_ADMIN_APP ? watchClient('admin') : Promise.resolve()),
		watchClient('public'),
		watchServer()
	]);
}
