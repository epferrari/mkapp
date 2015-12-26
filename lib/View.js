'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _lodash = require('lodash');

var _mixin = require('../theme/mixin');

var _mixin2 = _interopRequireDefault(_mixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function copy(object) {
	return (0, _lodash.merge)({}, object);
}

/**
* @name View
* @desc A view wrapper that can enforce certain behaviors for full screen views
* component mounts. Also provides a Bootstrap Grid for children to render into.
*
* @param {function|array} fixed - element or elements to render outside the Grid component.
* 	Good for drawers, modals, and fixed position elements like footers
*/
var View = _react2.default.createClass({
	displayName: 'View',

	mixins: [_mixin2.default],

	propTypes: {
		fixed: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.element, _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.element)])
	},

	render: function render() {
		var styles = this.prepareStyles();
		return _react2.default.createElement(
			'div',
			{ style: (0, _lodash.merge)({}, styles.viewframe, styles.grid), ref: 'view' },
			_react2.default.createElement(
				_reactBootstrap.Grid,
				{ style: (0, _lodash.merge)({}, styles.grid, this.props.style, styles.content) },
				this.props.children
			),
			this.props.fixed
		);
	},
	prepareStyles: function prepareStyles() {
		var _styles = this.getStyles();
		var themeStyles_view = (0, _lodash.pick)(this.getThemeStyles('view'), 'marginTop', 'minHeight');
		_styles.viewframe = (0, _lodash.merge)({}, _styles.viewframe, themeStyles_view);
		_styles.grid = (0, _lodash.merge)({}, _styles.grid, { minHeight: themeStyles_view.minHeight });
		return _styles;
	},
	getStyles: function getStyles() {
		return copy({
			viewframe: {
				position: "absolute",
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				width: "100%",
				marginTop: 40,
				minHeight: global.screen.height - 40
			},
			grid: {
				overflowX: 'hidden',
				overflowY: "scroll"
			},
			content: {
				WebkitOverflowScrolling: "touch"
			}
		});
	}
});

exports.default = View;