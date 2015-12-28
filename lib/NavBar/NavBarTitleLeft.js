'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _NavBarTitle = require('./NavBarTitle');

var _NavBarTitle2 = _interopRequireDefault(_NavBarTitle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NavTitleLeft = _react2.default.createClass({
  displayName: 'NavTitleLeft',
  render: function render() {
    return _react2.default.createElement(_NavBarTitle2.default, _extends({
      capitalize: true,
      maxLength: 20,
      width: 8
    }, this.props, {
      alignment: 'left' }));
  }
});

module.exports = NavTitleLeft;