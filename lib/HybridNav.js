'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AppleNav = require('./AppleNav');

var _AppleNav2 = _interopRequireDefault(_AppleNav);

var _AndroidNav = require('./AndroidNav');

var _AndroidNav2 = _interopRequireDefault(_AndroidNav);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HybridNav = _react2.default.createClass({
  displayName: 'HybridNav',

  contextTypes: {
    mkappTheme: _react2.default.PropTypes.object.isRequired
  },
  render: function render() {
    var NavComponent = this.context.mkappTheme.material ? _AndroidNav2.default : _AppleNav2.default;
    return _react2.default.createElement(
      NavComponent,
      this.props,
      this.props.children
    );
  }
});

exports.default = HybridNav;