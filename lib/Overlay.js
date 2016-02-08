'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _velocityAnimate = require('velocity-animate');

var _velocityAnimate2 = _interopRequireDefault(_velocityAnimate);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _lodash = require('lodash');

var _mixin = require('../theme/mixin');

var _mixin2 = _interopRequireDefault(_mixin);

var _Touchable = require('./Touchable');

var _Touchable2 = _interopRequireDefault(_Touchable);

var _MuiIcon = require('./MuiIcon');

var _MuiIcon2 = _interopRequireDefault(_MuiIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var noop = function () {
	return function () {
		return true;
	};
}();

var Overlay = _react2.default.createClass({
	displayName: 'Overlay',

	mixins: [_mixin2.default],
	propTypes: {
		open: _react2.default.PropTypes.bool,
		position: _react2.default.PropTypes.oneOf(['top', 'left', 'right', 'bottom']),
		style: _react2.default.PropTypes.object,
		willExit: _react2.default.PropTypes.func,
		didExit: _react2.default.PropTypes.func,
		didEnter: _react2.default.PropTypes.func,
		focusOnEnter: _react2.default.PropTypes.bool,
		closeButton: _react2.default.PropTypes.bool,
		closeButtonStyles: _react2.default.PropTypes.object
	},

	getDefaultProps: function getDefaultProps() {
		return {
			open: false,
			position: 'top',
			willExit: noop,
			didExit: noop,
			didEnter: noop,
			focusOnEnter: true,
			closeButton: false
		};
	},
	getInitialState: function getInitialState() {
		return {
			active: false,
			shouldAnimate: false,
			didAnimate: false
		};
	},
	show: function show() {
		var _this = this;

		if (this.state.shouldAnimate && !this.isAnimating) {
			var _ret = function () {
				var node = _this.refs.overlay;

				var _getOverlayStyles = _this.getOverlayStyles();

				var overlay__ANIMATING = _getOverlayStyles.overlay__ANIMATING;

				(0, _lodash.extend)(node.style, overlay__ANIMATING);
				// wrapping Velocity in a bluebird Promise since Velocity's Promise implementation fails to take the global assigned
				// in app.jsx
				return {
					v: new _bluebird2.default(function (resolve) {
						(0, _velocityAnimate2.default)(node, _this.getActiveStyle(), {
							duration: 350,
							complete: resolve,
							progress: function progress(elements) {
								// hackosaurus rex for keeping the fixed position during transformation
								elements.forEach(function (el) {
									return el.style.transform = "";
								});
							}
						});
					}).then(function () {
						// hook for parent components
						_this.props.didEnter();
						_this.setState({
							shouldAnimate: false,
							didAnimate: true,
							active: true
						});
					})
				};
			}();

			if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
		} else {
			return this.currentAnimation;
		}
	},
	hide: function hide() {
		var _this2 = this;

		var state = this.state;
		var node = this.refs.overlay;

		if (state.shouldAnimate && !this.isAnimating) {
			// call the hook here to alert parent components if the Overlay is managing its own closed state with a close button
			this.props.willExit();
			return new _bluebird2.default(function (resolve, reject) {
				(0, _velocityAnimate2.default)(node, _this2.getInitialStyle(), {
					duration: 300,
					complete: resolve,
					progress: function progress(elements) {
						// hackosaurus rex for keeping the fixed position during transformation
						elements.forEach(function (el) {
							return el.style.transform = "";
						});
					}
				}).then(function () {
					_this2.isAnimating = false;
					// hook for parent components
					_this2.props.didExit();
					_this2.setState({
						shouldAnimate: false,
						didAnimate: true,
						active: false
					});
				});
			});
		} else {
			return this.currentAnimation;
		}
	},
	forceHide: function forceHide() {
		this.setState({ shouldAnimate: true });
	},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		this.setState({ shouldAnimate: nextProps.open !== this.props.open });
	},
	componentDidUpdate: function componentDidUpdate() {
		var _this3 = this;

		var anims = this.getAnimationStyles();
		var closeButton = this.refs.closeButton;

		if (closeButton && this.state.active) {
			(0, _velocityAnimate2.default)(closeButton, anims.componentDidEnter, { delay: 450 });
		} else if (closeButton) {
			(0, _velocityAnimate2.default)(closeButton, anims.componentWillEnter, { duration: 200 });
		}

		if (this.state.shouldAnimate) {
			this.currentAnimation = this.state.active ? this.hide() : this.show();
			this.currentAnimation.then(function () {
				return _this3.props.onEnter && _this3.props.onEnter();
			});
		}
	},
	capture: function capture(e) {
		e.stopPropagation();
		e.preventDefault();
	},
	renderCloseButton: function renderCloseButton() {
		var btnStyles = (0, _lodash.merge)({}, {
			color: "rgb(255,255,255)",
			fontSize: 16,
			textDecoration: "none",
			fontWeight: 200,
			display: "table",
			width: "100%"
			//position: "absolute",
			//top: 8,
			//right: 8
		}, (0, _lodash.pick)(this.props.closeButtonStyles, 'color', 'fontWeight'));

		var iconStyles = {
			fontSize: 21,
			verticalAlign: "middle",
			paddingTop: 8,
			paddingRight: 8,
			display: 'table-cell',
			float: "right"
		};

		if (this.props.closeButton) {
			return _react2.default.createElement(
				_Touchable2.default,
				{ onClick: this.forceHide, style: btnStyles },
				_react2.default.createElement(_MuiIcon2.default, { ref: 'closeButton', style: iconStyles, icon: 'clear' })
			);
		}
	},
	render: function render() {
		var preparedStyles = this.prepareStyles();
		var containerStyles = this.getContainerStyles();
		var _state = this.state;
		var shouldAnimate = _state.shouldAnimate;
		var active = _state.active;

		containerStyles = (0, _lodash.merge)({}, containerStyles.container, (shouldAnimate || active) && containerStyles.container__ACTIVE);

		return _react2.default.createElement(
			_Touchable2.default,
			{
				component: 'div',
				onClick: this.forceHide,
				style: containerStyles },
			_react2.default.createElement(
				'div',
				{ style: preparedStyles, ref: 'overlay', onClick: this.capture, onTouchEnd: this.capture },
				this.renderCloseButton(),
				this.props.children
			)
		);
	},

	/* Styling */

	prepareStyles: function prepareStyles() {
		var _getOverlayStyles2 = this.getOverlayStyles();

		var overlay__BASE = _getOverlayStyles2.overlay__BASE;
		var overlay__IMMUTABLE = _getOverlayStyles2.overlay__IMMUTABLE;

		var renderStyle = (0, _lodash.merge)({}, overlay__BASE, this.props.style);

		if (this.state.active) {
			(0, _lodash.merge)(renderStyle, this.getActiveStyle(), overlay__IMMUTABLE);
		} else {
			(0, _lodash.merge)(renderStyle, this.getInitialStyle(), overlay__IMMUTABLE);
		}

		return renderStyle;
	},
	getInitialStyle: function getInitialStyle() {
		var _getOverlayStyles3 = this.getOverlayStyles();

		var overlay__INITIAL = _getOverlayStyles3.overlay__INITIAL;

		var offsetTop = this.getThemeStyles('overlay').top || 0;
		var positions = {
			top: {
				top: "-100%",
				paddingTop: offsetTop,
				left: 0
			},
			left: {
				left: "-100%",
				top: 0,
				paddingTop: offsetTop
			},
			right: {
				right: "-100%",
				top: 0,
				paddingTop: offsetTop
			},
			bottom: {
				left: 0,
				bottom: "-100%"
			}
		};
		return (0, _lodash.merge)({}, overlay__INITIAL, positions[this.props.position]);
	},
	getActiveStyle: function getActiveStyle() {
		var _getOverlayStyles4 = this.getOverlayStyles();

		var overlay__ACTIVE = _getOverlayStyles4.overlay__ACTIVE;

		var offsetTop = this.getThemeStyles('overlay').top || 0;
		var positions = {
			top: {
				top: 0,
				paddingTop: offsetTop,
				left: 0
			},
			left: {
				left: "0%",
				top: 0,
				paddingTop: offsetTop
			},
			right: {
				right: "0%",
				top: 0,
				paddingTop: offsetTop
			},
			bottom: {
				left: 0,
				bottom: "0%"
			}
		};

		return (0, _lodash.merge)({}, overlay__ACTIVE, positions[this.props.position]);
	},
	getOverlayStyles: function getOverlayStyles() {
		return {
			overlay__BASE: {
				width: "100%",
				height: "100%",
				backgroundColor: 'rgba(0,0,0,0.8)'
			},
			overlay__IMMUTABLE: {
				position: "fixed",
				overflowX: "hidden",
				overflowY: "scroll",
				backgroundSize: "cover"
			},
			overlay__INITIAL: {
				visibility: "hidden",
				opacity: 0,
				zIndex: 10
			},
			overlay__ANIMATING: {
				visibility: "visible",
				display: "block",
				zIndex: 999999999999
			},
			overlay__ACTIVE: {
				zIndex: 999999999999,
				opacity: 1
			}

		};
	},
	getContainerStyles: function getContainerStyles() {

		var offsetTop = this.getThemeStyles('overlay').top || 0;

		return {
			container: {
				zIndex: -10,
				opacity: 0
			},
			container__ACTIVE: {
				top: 0,
				paddingTop: offsetTop,
				bottom: 0,
				left: 0,
				right: 0,
				position: "fixed",
				width: "100%",
				height: "100%",
				zIndex: 999999999999,
				opacity: 1,
				transition: "opacity 400ms cubic-bezier(0.23, 1, 0.32, 1) 0ms",
				backgroundColor: this.props.focusOnEnter ? 'rgba(0,0,0,0.25)' : 'transparent'
			}
		};
	},
	getAnimationStyles: function getAnimationStyles() {
		/**
  * animation states for velocity-animate
  */
		return (0, _lodash.merge)({}, {
			componentWillEnter: {
				opacity: 0,
				marginLeft: -5,
				marginTop: -5
			},
			componentDidEnter: {
				opacity: 1,
				marginLeft: 0,
				marginTop: 0
			}
		});
	}
});

exports.default = Overlay;