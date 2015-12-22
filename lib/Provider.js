'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Provider = _react2.default.createClass({
  displayName: 'Provider',
  getChildContext: function getChildContext() {
    return {
      mkappTheme: this.props.mkappTheme
    };
  },

  childContextTypes: {
    mkappTheme: _react2.default.PropTypes.object
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      null,
      this.props.children
    );
  }
});

exports.default = Provider;