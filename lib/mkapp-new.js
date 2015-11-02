var boilerplate = require('./boilerplate.js');
var scaffold = require('./scaffold.js');

module.exports = function mkappNew(){
	return scaffold('./src').then(boilerplate);
};
