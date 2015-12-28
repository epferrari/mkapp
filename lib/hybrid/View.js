'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _View = require('../ios/View');

var _View2 = _interopRequireDefault(_View);

var _View3 = require('../material/View');

var _View4 = _interopRequireDefault(_View3);

var _mixin = require('../../theme/mixin');

var _mixin2 = _interopRequireDefault(_mixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HybridView = _react2.default.createClass({
  displayName: 'HybridView',

  mixins: [_mixin2.default],
  render: function render() {
    var ViewComponent = this.context.mkappTheme.options.preferMaterial ? _View4.default : _View2.default;
    return _react2.default.createElement(ViewComponent, this.props);
  }
});

module.exports = HybridView;