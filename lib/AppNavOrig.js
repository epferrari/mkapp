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

var _velocityAnimate = require('velocity-animate');

var _velocityAnimate2 = _interopRequireDefault(_velocityAnimate);

var _reactFaIcon = require('@epferrari/react-fa-icon');

var _reactFaIcon2 = _interopRequireDefault(_reactFaIcon);

var _typeOf = require('@epferrari/js-utils/lib/typeOf');

var _typeOf2 = _interopRequireDefault(_typeOf);

var _Overlay = require('./Overlay');

var _Overlay2 = _interopRequireDefault(_Overlay);

var _NavMenuItem = require('./NavMenuItem');

var _NavMenuItem2 = _interopRequireDefault(_NavMenuItem);

var _MuiIcon = require('./MuiIcon');

var _MuiIcon2 = _interopRequireDefault(_MuiIcon);

var _Touchable = require('./Touchable');

var _Touchable2 = _interopRequireDefault(_Touchable);

var _mixin = require('../theme/mixin');

var _mixin2 = _interopRequireDefault(_mixin);

var _styleMerger = require('../theme/utils/styleMerger');

var _styleMerger2 = _interopRequireDefault(_styleMerger);

var _DrawerLeft = require('./DrawerLeft');

var _DrawerLeft2 = _interopRequireDefault(_DrawerLeft);

var _DrawerRight = require('./DrawerRight');

var _DrawerRight2 = _interopRequireDefault(_DrawerRight);

var _Curtain = require('./Curtain');

var _Curtain2 = _interopRequireDefault(_Curtain);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _menuPositions = {
	left: _DrawerLeft2.default,
	right: _DrawerLeft2.default,
	top: _Curtain2.default
};

/*************************************/
/* helpers */

var Row = _react2.default.createClass({
	displayName: 'Row',
	getStyles: function getStyles() {
		return {
			width: '100%',
			display: 'block',
			marginLeft: 0,
			marginRight: 0,
			paddingLeft: 0,
			paddingRight: 0,
			boxSizing: 'border-box'
		};
	},
	render: function render() {
		return _react2.default.createElement('div', _extends({}, this.props, { style: (0, _lodash.merge)({}, this.getStyles(), this.props.style) }));
	}
});

var Col = _react2.default.createClass({
	displayName: 'Col',
	getStyles: function getStyles() {
		var w = this.props.xs;
		w = w && (0, _typeOf2.default)(w) === 'number' ? w : 12;
		return {
			width: w * 100 / 12 + '%',
			display: 'block',
			paddingLeft: 15,
			paddingRight: 15,
			minHeight: 1,
			position: 'relative',
			float: 'left',
			boxSizing: 'border-box'
		};
	},
	render: function render() {
		return _react2.default.createElement('div', _extends({}, this.props, { style: (0, _lodash.merge)({}, this.getStyles(), this.props.style) }));
	}
});

/*************************************/

var AppNav = _react2.default.createClass({
	displayName: 'AppNav',

	mixins: [_reactRouter.History, _mixin2.default],

	propTypes: {
		title: _react2.default.PropTypes.string,
		backButtonLink: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.bool]),
		isLoading: _react2.default.PropTypes.bool,
		connectionStatus: _react2.default.PropTypes.number,
		navbarColor: _react2.default.PropTypes.string,
		hideTitle: _react2.default.PropTypes.bool,
		menuItems: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
			path: _react2.default.PropTypes.string.isRequired,
			label: _react2.default.PropTypes.string,
			title: _react2.default.PropTypes.string
		})),
		menuPosition: _react2.default.PropTypes.oneOf(['top', 'left', 'right']),
		menuStyle: _react2.default.PropTypes.object,
		menuButtonLabel: _react2.default.PropTypes.string,
		menuButtonIconElement: _react2.default.PropTypes.element,
		materialDesign: _react2.default.PropTypes.bool
	},

	getDefaultProps: function getDefaultProps() {
		return {
			menuItems: [],
			navbarColor: undefined,
			hideTitle: false,
			usemkappTheme: true,
			menuPosition: "right",
			menuStyle: {
				width: "70%"
			},
			menuButtonLabel: "",
			menuButtonIconElement: _react2.default.createElement(_reactFaIcon2.default, { icon: 'bars' }),
			title: ""
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
	handleNavBack: function handleNavBack() {
		var backButtonLink = this.props.backButtonLink;

		if (backButtonLink === true) {
			global.history.go(-1);
		} else if (backButtonLink) {
			this.history.pushState(null, backButtonLink);
		}
	},
	renderStatusBar: function renderStatusBar() {
		var statusBar = null;
		var status = this.props.connectionStatus;
		var styles = this.getStyles();
		if (status === 0) {
			statusBar = _react2.default.createElement(
				Row,
				{ style: styles.navbar_statusBar },
				_react2.default.createElement(
					'span',
					{ style: { display: "table-cell" } },
					'Not Connected ',
					_react2.default.createElement(_MuiIcon2.default, { icon: 'warning' })
				)
			);
		} else if (status === 1) {
			statusBar = _react2.default.createElement(
				Row,
				{ style: styles.navbar_statusBar },
				_react2.default.createElement(
					'span',
					{ style: { display: "table-cell" } },
					'Connecting ',
					_react2.default.createElement(_reactFaIcon2.default, { icon: 'spinner', spin: true })
				)
			);
		} else {
			return null;
		}
		return statusBar;
	},
	renderBackButton: function renderBackButton(styles) {
		if (this.props.backButtonLink && !this.props.materialDesign) {
			return _react2.default.createElement(
				Col,
				{ xs: 2 },
				_react2.default.createElement(
					_Touchable2.default,
					{ component: 'div', style: styles.navbar_backBtn, onClick: this.handleNavBack },
					_react2.default.createElement(_MuiIcon2.default, { icon: 'arrow-back' })
				)
			);
		} else {
			return _react2.default.createElement(Col, { xs: 2 });
		}
	},
	renderLoadingState: function renderLoadingState() {
		return _react2.default.createElement(
			Col,
			{ xs: 1, style: { padding: 0, paddingTop: 4 } },
			this.props.isLoading && _react2.default.createElement(_reactFaIcon2.default, { icon: 'spinner', spin: true })
		);
	},
	trimTitle: function trimTitle() {
		if (this.props.title.length > 16) {
			return this.props.title.split('').slice(0, 16).concat("...").join('');
		} else {
			return this.props.title;
		}
	},
	renderTitleCenter: function renderTitleCenter(styles) {
		return _react2.default.createElement(
			Col,
			{ xs: 6 },
			_react2.default.createElement(
				'div',
				{ style: styles.navbar_titleCenter },
				!this.props.hideTitle && this.trimTitle()
			)
		);
	},
	renderTitleLeft: function renderTitleLeft(styles) {
		return _react2.default.createElement(
			Col,
			{ xs: 8 },
			_react2.default.createElement(
				'div',
				{ style: styles.navbar_titleLeft },
				!this.props.hideTitle && this.trimTitle()
			)
		);
	},
	renderMenuButtonRight: function renderMenuButtonRight(styles) {
		var _this = this;

		if (!this.state.menuActive) {
			return _react2.default.createElement(
				_Touchable2.default,
				{
					component: Col,
					xs: 3,
					onClick: function onClick(e) {
						e.stopPropagation();
						_this.showMenu();
					},
					style: { paddingRight: 8 } },
				_react2.default.createElement(
					'button',
					{ style: styles.navbar_menuOpenBtnRight },
					this.props.menuButtonLabel,
					' ',
					this.props.menuButtonIconElement
				)
			);
		} else {
			return _react2.default.createElement(Col, { xs: 3 });
		}
	},
	renderMenuButtonLeft: function renderMenuButtonLeft(styles) {
		var _this2 = this;

		if (!this.state.menuActive) {
			return _react2.default.createElement(
				_Touchable2.default,
				{
					component: Col,
					xs: 1,
					onClick: function onClick(e) {
						e.stopPropagation();
						_this2.showMenu();
					},
					style: { paddingRight: 8 } },
				_react2.default.createElement(
					'button',
					{ style: styles.navbar_menuOpenBtnLeft },
					this.props.menuButtonLabel,
					' ',
					this.props.menuButtonIconElement
				)
			);
		} else {
			return _react2.default.createElement(Col, { xs: 1 });
		}
	},
	renderNavItems: function renderNavItems() {
		var _this3 = this;

		return (0, _lodash.map)(this.props.menuItems, function (route, idx) {
			return _react2.default.createElement(_NavMenuItem2.default, {
				key: idx,
				shouldAnimate: _this3.state.menuActive,
				animDelay: idx * 50,
				name: route.label || route.title,
				path: route.path,
				onSelection: _this3.closeAndRoute });
		});
	},
	render: function render() {
		var _this4 = this;

		var styles = this.getStyles();

		var appNavStyle = (0, _lodash.merge)({}, styles.appNav);
		// root style, render with full screen height or collapsed navbar height
		if (this.state.menuActive || this.state.menuAnimating) (0, _lodash.merge)(appNavStyle, styles.appNav_open);

		var navbarStyle = (0, _lodash.merge)({}, styles.navbar);
		// render extra height for status bar?
		if ((0, _lodash.contains)([0, 1], this.props.connectionStatus)) (0, _lodash.merge)(navbarStyle, styles.navbar_hasStatus);

		// ensure `false` as prop overrides theme preference
		var md = this.props.materialDesign !== false ? this.props.materialDesign || this.preferMaterialTheme() : false;

		var MenuComponent = _menuPositions[this.props.menuPosition || md ? "left" : "top"];
		return _react2.default.createElement(
			'div',
			{ style: appNavStyle, onClick: function onClick() {
					return _this4.hideMenu();
				} },
			_react2.default.createElement(
				Row,
				{ style: navbarStyle },
				md ? this.renderMenuButtonLeft(styles) : this.renderBackButton(styles),
				md ? this.renderTitleLeft(styles) : this.renderLoadingState(styles),
				md ? this.renderBackButton(styles) : this.renderTitleCenter(styles),
				md ? this.renderLoadingState(styles) : this.renderMenuButtonRight(styles),
				this.renderStatusBar(styles),
				_react2.default.createElement(
					MenuComponent,
					{
						open: this.state.menuActive,
						onExit: this.menuDidLeave,
						style: styles.menu_overlay },
					_react2.default.createElement(
						'div',
						{ style: styles.menu_inner },
						_react2.default.createElement(
							'div',
							{ style: styles.menu_itemList },
							this.renderNavItems()
						),
						this.props.children
					)
				)
			)
		);
	},
	getStyles: function getStyles() {
		var _styles = this.getBaseStyles();
		return (0, _lodash.merge)(_styles, this.getNavbarStyles(_styles), this.getMenuStyles(_styles));
	},
	getNavbarStyles: function getNavbarStyles(baseStyles) {
		// theme styles
		var themeStyles_navbar = this.getThemeStyles('appNav');
		// props styles, override theme styles
		var propsStyles_navbar = {
			bgColor: this.props.navbarColor,
			textColor: this.props.textColor
		};

		// only use backgroundColor and color from and props
		// height, maxHeight, and top are immutably merged onto the theme
		var okProps = ['backgroundColor', 'color', 'height', 'maxHeight', 'paddingTop'];
		var navbarStyles = (0, _lodash.pick)((0, _styleMerger2.default)(propsStyles_navbar, themeStyles_navbar), okProps);
		var navbarWithStatusStyles = {
			height: navbarStyles.height + 6,
			maxHeight: navbarStyles.height + 6
		};

		// return to be merged into rendered styles
		return {
			navbar: (0, _lodash.merge)({}, baseStyles.navbar, navbarStyles),
			navbar_statusBar: (0, _lodash.merge)({}, baseStyles.navbar_statusBar, (0, _lodash.pick)(navbarStyles, 'backgroundColor', 'color')),
			navbar_hasStatus: (0, _lodash.merge)({}, baseStyles.navbar_hasStatus, navbarWithStatusStyles)
		};
	},
	getMenuStyles: function getMenuStyles(baseStyles) {
		var themeStyles_menu = this.getThemeStyles('appNavMenu');
		var propsStyles_menu = this.props.menuStyle || {};

		var mergedMenuStyles = (0, _styleMerger2.default)(propsStyles_menu, themeStyles_menu);
		// only use background and width styles from theme and props
		var styleProps = ['backgroundColor', 'backgroundPosition', 'backgroundRepeat', 'backgroundSize', 'width', 'maxWidth', 'minWidth'];

		var menuStyles = (0, _lodash.pick)(mergedMenuStyles, styleProps);
		var closeBtnStyles = (0, _lodash.pick)(mergedMenuStyles, 'color');

		return { menu_overlay: (0, _lodash.merge)({}, baseStyles.menu_overlay, menuStyles) };
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
			appNav: {
				position: "fixed",
				top: 0,
				left: 0,
				right: 0,
				zIndex: 1,
				WebkitOverflowScrolling: "touch"
			},
			appNav_open: {
				bottom: 0,
				height: "100%",
				minHeight: "100%",
				maxHeight: "100%",
				zIndex: 999999999
			},
			navbar: {
				backgroundColor: "rgb(0,0,0)",
				verticalAlign: 'middle',
				//paddingTop: 8,
				minHeight: 30,
				height: 30,
				maxHeight: 30,
				fontSize: 14,
				textTransform: "uppercase",
				color: "#fff",
				fontWeight: 200,
				marginLeft: 0,
				marginRight: 0
			},
			navbar_hasStatus: {
				height: 36,
				maxHeight: 36
			},
			navbar_statusBar: {
				fontSize: 10,
				height: 6,
				maxHeight: 6,
				textTransform: "none",
				textAlign: "center",
				color: "#fff",
				backgroundColor: "rgb(0,0,0)",
				display: "table",
				width: "100%",
				verticalAlign: "middle"
			},
			navbar_titleCenter: {
				paddingTop: 4,
				textAlign: "center",
				width: "100%"
			},
			navbar_titleLeft: {
				paddingTop: 4,
				textAlign: "left",
				width: "100%",
				textTransform: "capitalize"
			},
			navbar_menuOpenBtnLeft: {
				margin: 0,
				padding: 0,
				paddingTop: 4,
				border: "none",
				background: "none",
				float: "left",
				paddingBottom: 0
			},
			navbar_menuOpenBtnRight: {
				margin: 0,
				padding: 0,
				paddingTop: 4,
				border: "none",
				background: "none",
				float: "right",
				paddingBottom: 0
			},
			navbar_backBtn: {
				width: 40,
				cursor: "pointer",
				fontSize: 20,
				fontWeight: 100,
				paddingTop: 4,
				marginLeft: -10,
				marginTop: -4
			},
			menu_inner: {
				position: "relative",
				paddingTop: 16,
				paddingBottom: 166,
				minHeight: global.innerHeight
			},
			menu_itemList: {
				display: "block",
				width: "100%",
				textTransform: "uppercase",
				textAlign: "right",
				paddingRight: 3,
				paddingTop: 20
			},
			menu_closeBtnBottom: {
				color: "rgb(255,205,17)",
				fontSize: 16,
				textDecoration: "none",
				fontWeight: 200,
				float: "right",
				margin: 0,
				padding: 0,
				border: "none",
				background: "none",
				cursor: "pointer",
				/* this doesn't work for smaller screens */
				position: "absolute",
				bottom: 22,
				right: 12
			}
		});
	}
});

exports.default = AppNav;