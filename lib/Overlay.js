'use strict';

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

var styles = {
	overlay: {
		width: "100%",
		height: "100%",
		backgroundColor: 'rgba(0,0,0,0.8)'
	},
	overlay_immutable: {
		position: "fixed",
		overflowX: "hidden",
		overflowY: "scroll",
		backgroundSize: "cover"
	},
	overlay_initial: {
		visibility: "hidden",
		opacity: 0,
		zIndex: 10
	},
	overlay_animating: {
		visibility: "visible",
		display: "block",
		zIndex: 999999999999
	},
	overlay_active: {
		zIndex: 999999999999,
		opacity: 1
	},
	overlay_container: {
		zIndex: -10
	},
	overlay_container_active: {
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		position: "fixed",
		width: "100%",
		height: "100%",
		zIndex: 999999999999
	}
};

var Overlay = _react2.default.createClass({
	displayName: 'Overlay',

	propTypes: {
		open: _react2.default.PropTypes.bool,
		position: _react2.default.PropTypes.oneOf(['top', 'left', 'right', 'bottom']),
		style: _react2.default.PropTypes.object,
		onExit: _react2.default.PropTypes.func
	},

	getDefaultProps: function getDefaultProps() {
		return {
			open: false,
			position: 'top',
			onExit: function onExit() {
				return true;
			}
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
			var _ret = (function () {
				var node = _this.refs.overlay;
				(0, _lodash.extend)(node.style, styles.overlay_animating);
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
						_this.setState({
							shouldAnimate: false,
							didAnimate: true,
							active: true
						});
					})
				};
			})();

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
					_this2.props.onExit();
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
		if (this.state.shouldAnimate) {
			this.currentAnimation = this.state.active ? this.hide() : this.show();
		}
	},
	capture: function capture(e) {
		e.stopPropagation();
		e.preventDefault();
	},
	render: function render() {
		var _styles = this.prepareStyles();
		var _state = this.state;
		var shouldAnimate = _state.shouldAnimate;
		var active = _state.active;

		return _react2.default.createElement(
			'div',
			{
				onClick: this.forceHide,
				style: (0, _lodash.merge)({}, styles.overlay_container, shouldAnimate || active ? styles.overlay_container_active : {}) },
			_react2.default.createElement(
				'div',
				{ style: _styles, ref: 'overlay', onClick: this.capture },
				this.props.children
			)
		);
	},
	prepareStyles: function prepareStyles() {
		var _style = (0, _lodash.merge)({}, styles.overlay, this.props.style);

		if (this.state.active) {
			(0, _lodash.merge)(_style, this.getActiveStyle(), styles.overlay_immutable);
		} else {
			(0, _lodash.merge)(_style, this.getInitialStyle(), styles.overlay_immutable);
		}

		return _style;
	},
	getInitialStyle: function getInitialStyle() {
		var positions = {
			top: {
				top: "-100%",
				left: 0
			},
			left: {
				left: "-100%",
				top: 0
			},
			right: {
				right: "-100%",
				top: 0
			},
			bottom: {
				left: 0,
				bottom: "-100%"
			}
		};
		return (0, _lodash.merge)({}, styles.overlay_initial, positions[this.props.position]);
	},
	getActiveStyle: function getActiveStyle() {
		var positions = {
			top: {
				top: "0%",
				left: 0
			},
			left: {
				left: "0%",
				top: 0
			},
			right: {
				right: "0%",
				top: 0
			},
			bottom: {
				left: 0,
				bottom: "0%"
			}
		};
		return (0, _lodash.merge)({}, styles.overlay_active, positions[this.props.position]);
	}
});

exports.default = Overlay;