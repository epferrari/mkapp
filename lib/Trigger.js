'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* @desc ensure click handler on iOS by wrapping components in a dummy div with a cursor: pointer style
*/
var Trigger = _react2.default.createClass({
	displayName: 'Trigger',
	getDefaultProps: function getDefaultProps() {
		return { touchEnabled: false };
	},
	getStyles: function getStyles() {
		return {
			backgroundColor: "transparent",
			border: "none",
			outline: "none",
			display: "inline-block",
			cursor: "pointer"
		};
	},
	render: function render() {

		var props = (0, _lodash.merge)({}, this.props);
		if (props.onClick && !!props.touchEnabled) {
			delete props.onClick;
			props.onTouchEnd = this.props.onClick;
		}

		return _react2.default.createElement(
			'div',
			_extends({}, props, { className: 'clear-button', style: (0, _lodash.merge)({}, this.props.style, this.getStyles()) }),
			this.props.children
		);
	}
});

exports.default = Trigger;