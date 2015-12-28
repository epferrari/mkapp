'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _View = require('../View');

var _View2 = _interopRequireDefault(_View);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MaterialView = _react2.default.createClass({
  displayName: 'MaterialView',
  render: function render() {
    return _react2.default.createElement(_View2.default, _extends({}, this.props, { navbarOffset: 60 }));
  }
});

module.exports = MaterialView;