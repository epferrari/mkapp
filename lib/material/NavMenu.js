'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _NavMenu = require('../NavMenu');

var _NavMenu2 = _interopRequireDefault(_NavMenu);

var _NavMenuItem = require('../NavMenu/NavMenuItem');

var _NavMenuItem2 = _interopRequireDefault(_NavMenuItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MaterialNavMenu = _react2.default.createClass({
  displayName: 'MaterialNavMenu',
  render: function render() {
    return _react2.default.createElement(_NavMenu2.default, _extends({}, this.props, {
      position: 'left',
      itemRenderer: _react2.default.createElement(_NavMenuItem2.default, { renderIcon: false, uppercase: false }) }));
  }
});

module.exports = MaterialNavMenu;