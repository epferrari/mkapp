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

var NotifyBarBottom = _react2.default.createClass({
	displayName: 'NotifyBarBottom',

	mixins: [_mixin2.default],
	propTypes: {
		open: _react2.default.PropTypes.bool,
		style: _react2.default.PropTypes.object,
		onExit: _react2.default.PropTypes.func
	},
	prepareStyles: function prepareStyles() {
		var defaultStyles = {
			bgColor: 'rgb(0,0,0)',
			color: 'rgb(255,255,255)',
			height: 75,
			minHeight: 75,
			maxHeight: 75,
			boxShadow: "rgba(0,0,0,0.5) 0px 3px 6px"
		};
		var themeStyles = (0, _lodash.merge)({}, this.getThemeStyles('notifyBar'), this.getThemeStyles('notifyBarBottom'));
		var okStyles = ['backgroundColor', 'color', 'height', 'minHeight', 'maxHeight', 'boxShadow'];
		var _styles = (0, _lodash.pick)((0, _styleMerger2.default)(this.props.style, themeStyles, defaultStyles), okStyles);
		_styles.maxHeight = global.screenHeight;
		return _styles;
	},
	render: function render() {
		return _react2.default.createElement(
			_Overlay2.default,
			_extends({
				focusOnEnter: false,
				closeButton: false
			}, this.props, {
				style: this.prepareStyles(),
				position: 'bottom' }),
			this.props.children
		);
	}
});

exports.default = NotifyBarBottom;