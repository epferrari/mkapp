'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Overlay = require('./Overlay');

var _Overlay2 = _interopRequireDefault(_Overlay);

var _styleMerger = require('../theme/utils/styleMerger');

var _styleMerger2 = _interopRequireDefault(_styleMerger);

var _lodash = require('lodash');

var _mixin = require('../theme/mixin');

var _mixin2 = _interopRequireDefault(_mixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Curtain = _react2.default.createClass({
  displayName: 'Curtain',

  mixins: [_mixin2.default],
  propTypes: {
    open: _react2.default.PropTypes.bool,
    style: _react2.default.PropTypes.object,
    onExit: _react2.default.PropTypes.func
  },
  prepareStyles: function prepareStyles() {
    var defaultStyles = {
      bgColor: 'rgba(0,0,0,0.8)',
      color: 'rgb(255,255,255)'
    };
    var okStyles = ['backgroundColor', 'color'];
    var _styles = (0, _lodash.pick)((0, _styleMerger2.default)(this.props.style, this.getThemeStyles('curtain'), defaultStyles), okStyles);
    _styles.height = global.screenHeight;
    _styles.maxHeight = global.screenHeight;
    _styles.minHeight = global.screenHeight;
    return _styles;
  },
  render: function render() {
    return _react2.default.createElement(
      _Overlay2.default,
      _extends({}, this.props, {
        style: this.prepareStyles(),
        position: 'top' }),
      this.props.children
    );
  }
});

exports.default = Curtain;