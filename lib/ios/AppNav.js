'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AppNav = require('../AppNav');

var _AppNav2 = _interopRequireDefault(_AppNav);

var _NavBar = require('./NavBar');

var _NavBar2 = _interopRequireDefault(_NavBar);

var _NavMenu = require('./NavMenu');

var _NavMenu2 = _interopRequireDefault(_NavMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var iosAppNav = _react2.default.createClass({
  displayName: 'iosAppNav',
  render: function render() {
    return _react2.default.createElement(
      _AppNav2.default,
      this.props,
      _react2.default.createElement(_NavBar2.default, null),
      _react2.default.createElement(_NavMenu2.default, null)
    );
  }
});

module.exports = iosAppNav;