'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
	color: 'inherit',
	fontSize: 'inherit',
	fontWeight: 'inherit',
	display: 'inline-block'
};

var MuiIcon = _react2.default.createClass({
	displayName: 'MuiIcon',
	render: function render() {
		return _react2.default.createElement('i', { style: (0, _lodash.merge)({}, styles, this.props.style), className: "mui-font-icon mui-" + this.props.icon });
	}
});

exports.default = MuiIcon;