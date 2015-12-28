'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _NavBarTitle = require('./NavBarTitle');

var _NavBarTitle2 = _interopRequireDefault(_NavBarTitle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NavTitleCenter = _react2.default.createClass({
  displayName: 'NavTitleCenter',
  render: function render() {
    return _react2.default.createElement(_NavBarTitle2.default, _extends({
      capitalize: false,
      width: 6,
      maxLength: 16
    }, this.props, {
      alignment: 'center' }));
  }
});

module.exports = NavTitleCenter;