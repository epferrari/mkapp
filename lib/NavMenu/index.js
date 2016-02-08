'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DrawerLeft = require('../DrawerLeft');

var _DrawerLeft2 = _interopRequireDefault(_DrawerLeft);

var _DrawerRight = require('../DrawerRight');

var _DrawerRight2 = _interopRequireDefault(_DrawerRight);

var _Curtain = require('../Curtain');

var _Curtain2 = _interopRequireDefault(_Curtain);

var _NavMenuItem = require('./NavMenuItem');

var _NavMenuItem2 = _interopRequireDefault(_NavMenuItem);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var menuPositions = {
	left: _DrawerLeft2.default,
	right: _DrawerRight2.default,
	top: _Curtain2.default
};

var NavMenu = _react2.default.createClass({
	displayName: 'NavMenu',

	propTypes: {
		menuItems: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
			label: _react2.default.PropTypes.string,
			title: _react2.default.PropTypes.string,
			path: _react2.default.PropTypes.string,
			onSelection: _react2.default.PropTypes.func
		})),
		onNavSelection: _react2.default.PropTypes.func.isRequired,
		animateMenuItems: _react2.default.PropTypes.bool,
		style: _react2.default.PropTypes.object,
		itemRenderer: _react2.default.PropTypes.object,
		position: _react2.default.PropTypes.oneOf(['left', 'right', 'top'])
	},

	getDefaultProps: function getDefaultProps() {
		return {
			menuItems: [],
			itemRenderer: _react2.default.createElement(_NavMenuItem2.default, null),
			onNavSelection: function onNavSelection() {},
			position: 'right'
		};
	},
	renderNavItems: function renderNavItems() {
		var _this = this;

		return (0, _lodash.map)(this.props.menuItems, function (route, idx) {

			var onSelection = undefined;

			// allow for custom actions in NavItems when `onSelection` prop is present on menuItem
			// still call onNavSelection from props, will close the AppNav
			if (route.onSelection) {
				onSelection = function onSelection(path) {
					route.onSelection(path);
					_this.props.onNavSelection(path);
				};
			} else {
				onSelection = _this.props.onNavSelection;
			}

			return _react2.default.cloneElement(_this.props.itemRenderer, {
				key: idx,
				animationDelay: 300 + idx * 50,
				title: route.title,
				path: route.path,
				onSelection: onSelection
			});
		});
	},
	render: function render() {
		var styles = this.prepareStyles();
		var OverlayComponent = menuPositions[this.props.position];
		return _react2.default.createElement(
			OverlayComponent,
			this.props,
			_react2.default.createElement(
				'div',
				{ style: styles.menu_INNER },
				this.renderNavItems(),
				this.props.children
			)
		);
	},
	prepareStyles: function prepareStyles() {
		return (0, _lodash.merge)({}, {
			menu_INNER: {
				position: "relative",
				paddingTop: 16,
				paddingRight: 8,
				paddingLeft: 8,
				//paddingBottom:166,
				minHeight: global.screen.height
			}
		});
	}
});

module.exports = NavMenu;