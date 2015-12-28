'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mixin = require('../../theme/mixin');

var _mixin2 = _interopRequireDefault(_mixin);

var _AppNav = require('../ios/AppNav');

var _AppNav2 = _interopRequireDefault(_AppNav);

var _AppNav3 = require('../material/AppNav');

var _AppNav4 = _interopRequireDefault(_AppNav3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HybridNav = _react2.default.createClass({
  displayName: 'HybridNav',

  mixins: [_mixin2.default],
  render: function render() {
    var NavComponent = this.context.mkappTheme.options.preferMaterial ? _AppNav4.default : _AppNav2.default;
    return _react2.default.createElement(NavComponent, this.props);
  }
});

module.exports = HybridNav;