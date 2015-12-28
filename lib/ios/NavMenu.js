'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _NavMenu = require('../NavMenu');

var _NavMenu2 = _interopRequireDefault(_NavMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var iosNavMenu = _react2.default.createClass({
  displayName: 'iosNavMenu',
  render: function render() {
    return _react2.default.createElement(_NavMenu2.default, _extends({}, this.props, { position: 'top' }));
  }
});

module.exports = iosNavMenu;