'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AppNav = require('./AppNav');

var _AppNav2 = _interopRequireDefault(_AppNav);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AppleNav = _react2.default.createClass({
  displayName: 'AppleNav',
  render: function render() {
    return _react2.default.createElement(_AppNav2.default, _extends({}, this.props, {
      menuPosition: 'top',
      menuStyle: (0, _lodash.merge)({}, this.props.menuStyle, { width: "100%" }) }));
  }
});

exports.default = AppleNav;