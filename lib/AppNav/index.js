'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _lodash = require('lodash');

var _reactRouter = require('react-router');

var _mixin = require('../../theme/mixin');

var _mixin2 = _interopRequireDefault(_mixin);

var _styleMerger = require('../../theme/utils/styleMerger');

var _styleMerger2 = _interopRequireDefault(_styleMerger);

var _NavBar = require('../NavBar');

var _NavBar2 = _interopRequireDefault(_NavBar);

var _NavMenu = require('../NavMenu');

var _NavMenu2 = _interopRequireDefault(_NavMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AppNav = _react2.default.createClass({
	displayName: 'AppNav',

	mixins: [_reactRouter.History, _mixin2.default],

	propTypes: {
		title: _react2.default.PropTypes.string,
		isLoading: _react2.default.PropTypes.bool,
		connectionStatus: _react2.default.PropTypes.number,
		navbarColor: _react2.default.PropTypes.string,
		menuItems: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
			path: _react2.default.PropTypes.string.isRequired,
			label: _react2.default.PropTypes.string,
			title: _react2.default.PropTypes.string
		})),
		menuStyle: _react2.default.PropTypes.object,
		menuButtonLabel: _react2.default.PropTypes.string,
		menuButtonIconElement: _react2.default.PropTypes.element
	},

	getDefaultProps: function getDefaultProps() {
		return {
			menuItems: [],
			usemkappTheme: true,
			menuPosition: "right"
		};
	},
	getInitialState: function getInitialState() {
		return {
			menuActive: false
		};
	},
	showMenu: function showMenu() {
		if (!this.state.menuActive) {
			this.setState({
				menuActive: true,
				menuAnimating: true
			});
		}
	},
	hideMenu: function hideMenu() {
		this.setState({
			menuActive: false,
			menuAnimating: true
		});
	},
	closeAndRoute: function closeAndRoute(nextRoute) {
		this.setState({
			nextRoute: nextRoute,
			menuActive: false,
			menuAnimating: true
		});
	},
	menuDidLeave: function menuDidLeave() {
		var nextRoute = this.state.nextRoute;
		this.setState({
			menuActive: false,
			menuAnimating: false,
			nextRoute: null
		});
		if (nextRoute) this.history.pushState(null, nextRoute);
	},
	render: function render() {
		var _this = this;

		var styles = this.prepareStyles();
		var navbarProps = (0, _lodash.pick)(this.props, ['textColor', 'navbarColor', 'title', 'menuButtonLabel', 'menuButtonIconElement', 'connectionStatus']);

		var childCount = _react2.default.Children.count(this.props.children);
		if (childCount === 1 || childCount > 2) {
			throw new Error('AppNav accepts exactly 2 children, a NavBar component and a NavMenu component. Check the render method of AppNav');
		}
		if (childCount === 0) {
			return _react2.default.createElement(
				'div',
				{ style: styles.appnav, onClick: function onClick() {
						return _this.hideMenu();
					} },
				_react2.default.createElement(_NavBar2.default, _extends({}, navbarProps, { showActivity: this.props.isLoading, onMenuButtonClick: this.showMenu })),
				_react2.default.createElement(_NavMenu2.default, {
					open: this.state.menuActive,
					onExit: this.menuDidLeave,
					style: styles.menu_OVERLAY,
					closeButtonStyles: styles.menu_CLOSE_BUTTON,
					menuItems: this.props.menuItems,
					onRouteSelection: this.closeAndRoute })
			);
		} else {
			return _react2.default.createElement(
				'div',
				{ style: styles.appnav, onClick: function onClick() {
						return _this.hideMenu();
					} },
				_react2.default.Children.map(this.props.children, function (child, index) {
					if (index === 0) {
						// NavBar Component
						return _react2.default.cloneElement(child, (0, _lodash.merge)({}, navbarProps, {
							showActivity: _this.props.isLoading,
							onMenuButtonClick: _this.showMenu
						}));
					} else if (index === 1) {
						// Menu Component
						return _react2.default.cloneElement(child, {
							open: _this.state.menuActive,
							onExit: _this.menuDidLeave,
							style: (0, _lodash.merge)({}, styles.menu_OVERLAY, child.props.style),
							closeButtonStyles: (0, _lodash.merge)({}, styles.menu_CLOSE_BUTTON, child.props.closeButtonStyles),
							menuItems: _this.props.menuItems,
							onRouteSelection: _this.closeAndRoute
						});
					}
				})
			);
		}
	},
	prepareStyles: function prepareStyles() {
		var baseStyles = this.getBaseStyles();
		var menuStyles = {
			props: this.props.menuStyle || {},
			theme: this.getThemeStyles('navMenu'),
			merged: {}
		};

		// only allow subset of styles to be overridden
		var menuStyleKeys = ['backgroundColor', 'backgroundPosition', 'backgroundRepeat', 'backgroundSize', 'width', 'maxWidth', 'minWidth', 'color', 'fontWeight'];

		menuStyles.merged = (0, _lodash.pick)((0, _styleMerger2.default)(menuStyles.props, menuStyles.theme), menuStyleKeys);

		// render with full screen height or collapsed navbar height
		var menuActive = this.state.menuActive;

		return (0, _lodash.merge)({}, baseStyles, {
			appnav: (0, _lodash.merge)({}, baseStyles.appnav_BASE, menuActive && baseStyles.appnav_OPEN),
			menu_OVERLAY: (0, _lodash.merge)({}, menuStyles.merged),
			menu_CLOSE_BUTTON: (0, _lodash.merge)({}, menuStyles.merged, this.props.closeButtonStyles)
		});
	},
	getBaseStyles: function getBaseStyles() {
		return (0, _lodash.merge)({}, {
			/**
   * animation states for velocity-animate
   */
			componentWillEnter: {
				opacity: 0,
				marginLeft: -5,
				marginTop: -5
			},
			componentDidEnter: {
				opacity: 1,
				marginLeft: 0,
				marginTop: 0
			},
			appnav_BASE: {
				position: "fixed",
				top: 0,
				left: 0,
				right: 0,
				zIndex: 1,
				WebkitOverflowScrolling: "touch"
			},
			appnav_OPEN: {
				bottom: 0,
				height: "100%",
				minHeight: "100%",
				maxHeight: "100%",
				zIndex: 999999999
			}
		});
	}
});

exports.default = AppNav;