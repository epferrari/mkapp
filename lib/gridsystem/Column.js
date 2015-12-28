'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Column = _react2.default.createClass({
	displayName: 'Column',
	getStyles: function getStyles() {
		var w = this.props.width;
		w = Number.isInteger(w) ? w : 12;
		return {
			width: w * 100 / 12 + '%',
			display: 'block',
			paddingLeft: 15,
			paddingRight: 15,
			minHeight: 1,
			position: 'relative',
			float: 'left',
			boxSizing: 'border-box'
		};
	},
	render: function render() {
		return _react2.default.createElement('div', _extends({}, this.props, { style: (0, _lodash.merge)({}, this.getStyles(), this.props.style) }));
	}
});

module.exports = Column;