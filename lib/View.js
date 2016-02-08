'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Container = require('./gridsystem/Container');

var _Container2 = _interopRequireDefault(_Container);

var _lodash = require('lodash');

var _mixin = require('../theme/mixin');

var _mixin2 = _interopRequireDefault(_mixin);

var _styleMerger = require('../theme/utils/styleMerger');

var _styleMerger2 = _interopRequireDefault(_styleMerger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function copy(object) {
	return (0, _lodash.merge)({}, object);
}

/**
* @name View
* @desc A view wrapper that can enforce certain behaviors for full screen views
* component mounts. Also provides a Bootstrap Grid for children to render into.
*
* @param {function|array} static - element or elements to render outside the Grid component.
* 	Good for drawers, modals, and fixed position elements like footers
*/
var View = _react2.default.createClass({
	displayName: 'View',

	mixins: [_mixin2.default],

	propTypes: {
		static: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.element, _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.element)]),
		navbarOffset: _react2.default.PropTypes.number
	},

	getDefaultProps: function getDefaultProps() {
		return { navbarOffset: 30 };
	},
	render: function render() {
		var styles = this.prepareStyles();
		var propsStyles = (0, _lodash.merge)({}, this.props.style);
		var bgStyles = (0, _lodash.pick)((0, _styleMerger2.default)(this.props.style, this.getThemeStyles('view')), 'backgroundColor');
		delete propsStyles.backgroundColor;
		return _react2.default.createElement(
			'div',
			{ style: (0, _lodash.merge)({}, styles.viewframe, bgStyles), ref: 'view' },
			_react2.default.createElement(
				_Container2.default,
				{ style: (0, _lodash.merge)({}, styles.container, propsStyles, styles.content) },
				this.props.children
			),
			this.props.static
		);
	},
	prepareStyles: function prepareStyles() {
		var offsetTop = this.getThemeStyles('view').offsetTop || 0;
		return copy({
			viewframe: {
				position: "absolute",
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				width: "100%",
				overflowX: 'hidden',
				overflowY: "scroll",
				minHeight: global.innerHeight
			},
			container: {
				overflowX: 'hidden',
				overflowY: "scroll",
				paddingTop: (this.props.style || { paddingTop: 0 }).paddingTop,
				marginTop: this.props.navbarOffset + offsetTop,
				minHeight: global.innerHeight - this.props.navbarOffset - offsetTop
			},
			content: {
				WebkitOverflowScrolling: "touch"
			}
		});
	}
});

exports.default = View;