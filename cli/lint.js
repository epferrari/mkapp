var Promise = require('bluebird');
var CLIEngine = require('eslint').CLIEngine;
var cli = new CLIEngine({
	envs:["browser","mocha"],
	extensions:[".js",".jsx"],
	useEslintrc: true,
	parser:"babel-eslint",
	ecmaFeaturesj:["jsx","spread","generators"]
});

module.exports = function lint(){
	var paths = [].slice.call(arguments,0);
	return new Promise(function(resolve,reject){
		console.log('linting source files');
		var report = cli.executeOnFiles(paths);
		var formatter = cli.getFormatter();
		console.log(formatter(report.results));
		if(report.results.errorCount){
			reject('Returned errors eslint did. Ashamed you are.');
		}else{
			resolve();
		}
	});
};
