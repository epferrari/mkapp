'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  paddingRight: 0,
  paddingLeft: 0,
  marginLeft: "auto",
  marginRight: "auto",
  maxWidth: 980
};

var styleSheetId = 'mkapp-stylesheet';
var styleSheet = document.getElementById(styleSheetId) || document.createElement('style');
styleSheet.id = styleSheetId;
styleSheet.innerHTML += "div.mkapp-container::after{content:''; display:table}";
styleSheet.innerHTML += "div.mkapp-container::after{clear: both;content:''; display:table}";
(document.head || document.getElementsByTagName('head')[0]).appendChild(styleSheet);

var Container = _react2.default.createClass({
  displayName: 'Container',
  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'mkapp-container', style: (0, _lodash.merge)({}, styles, this.props.style) },
      this.props.children
    );
  }
});

module.exports = Container;