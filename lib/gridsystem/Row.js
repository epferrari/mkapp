'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Row = _react2.default.createClass({
	displayName: 'Row',
	getStyles: function getStyles() {
		return {
			width: '100%',
			display: 'block',
			marginLeft: 0,
			marginRight: 0,
			paddingLeft: 0,
			paddingRight: 0,
			boxSizing: 'border-box'
		};
	},
	prepareStyles: function prepareStyles() {
		return (0, _lodash.merge)({}, this.getStyles(), this.props.style);
	},
	render: function render() {
		var props = (0, _lodash.merge)({}, this.props);
		var style = props.style;
		delete props.style;
		return _react2.default.createElement('div', _extends({}, props, { style: this.prepareStyles() }));
	}
});

module.exports = Row;