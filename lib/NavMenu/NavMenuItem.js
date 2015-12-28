'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _reactRouter = require('react-router');

var _reactRouter2 = _interopRequireDefault(_reactRouter);

var _velocityAnimate = require('velocity-animate');

var _velocityAnimate2 = _interopRequireDefault(_velocityAnimate);

var _reactFaIcon = require('@epferrari/react-fa-icon');

var _reactFaIcon2 = _interopRequireDefault(_reactFaIcon);

var _MuiIcon = require('../MuiIcon');

var _MuiIcon2 = _interopRequireDefault(_MuiIcon);

var _mixin = require('../../theme/mixin');

var _mixin2 = _interopRequireDefault(_mixin);

var _Touchable = require('../Touchable');

var _Touchable2 = _interopRequireDefault(_Touchable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var transitions = {
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
};

var NavMenuItem = _react2.default.createClass({
	displayName: 'NavMenuItem',

	mixins: [_mixin2.default],
	propTypes: {
		uppercase: _react2.default.PropTypes.bool,
		textColor: _react2.default.PropTypes.string,
		activeTextColor: _react2.default.PropTypes.string,
		onSelection: _react2.default.PropTypes.func.isRequired,
		path: _react2.default.PropTypes.string,
		name: _react2.default.PropTypes.string,
		alignment: _react2.default.PropTypes.oneOf(['left', 'right']),
		renderIcon: _react2.default.PropTypes.bool
	},
	getDefaultProps: function getDefaultProps() {
		return {
			uppercase: true,
			renderIcon: true,
			alignment: 'right',
			onSelection: function onSelection() {}
		};
	},

	contextTypes: {
		location: _react2.default.PropTypes.object
	},

	getInitialState: function getInitialState() {
		return { active: false };
	},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		this.setState({
			active: this.context.location.pathname === nextProps.path
		});
	},
	renderIcon: function renderIcon() {
		if (this.props.renderIcon && this.props.alignment === 'right') {
			var icon = this.state.active ? "navigate-before" : "navigate-next";
			var iconStyle = this.getThemeStyles('navMenuChevron');
			if (this.state.active) {
				(0, _lodash.merge)(iconStyle, { color: this.getThemePalette().accent1Color });
			}
			return _react2.default.createElement(_MuiIcon2.default, { icon: icon, style: iconStyle });
		}
	},
	setNextRoute: function setNextRoute(e) {
		e.preventDefault();
		e.stopPropagation();
		if (this.props.onSelection) this.props.onSelection(this.props.path);
	},
	render: function render() {
		var styles = this.prepareStyles();
		return _react2.default.createElement(
			'div',
			{ style: styles.root },
			_react2.default.createElement(
				'div',
				{
					ref: 'menuItem',
					style: styles.menuItem },
				_react2.default.createElement(
					_Touchable2.default,
					{
						onClick: this.setNextRoute,
						style: styles.menuItem_LINK },
					_react2.default.createElement(
						'span',
						{ style: { verticalAlign: "middle", marginRight: 4 } },
						this.props.name
					),
					this.renderIcon()
				)
			)
		);
	},
	componentDidUpdate: function componentDidUpdate() {
		var ts = transitions;
		var el = this.refs.menuItem;
		if (this.props.shouldAnimate) {
			(0, _velocityAnimate2.default)(el, ts.componentDidEnter, {
				delay: this.props.animationDelay,
				progress: function progress(elements) {
					// hackosaurus rex for keeping the fixed position during transformation
					elements.forEach(function (el) {
						return el.style.transform = "";
					});
				}
			});
		} else {
			(0, _velocityAnimate2.default)(el, ts.componentWillEnter, { duration: 0 });
		}
	},
	prepareStyles: function prepareStyles() {
		var styles = this.getBaseStyles();
		if (this.state.active) {
			styles.menuItem_LINK = (0, _lodash.merge)({}, styles.menuItem_LINK, {
				color: this.props.activeTextColor || this.getThemePalette().accent1Color
			});
		}
		return styles;
	},
	getBaseStyles: function getBaseStyles() {
		var translateX = !this.props.renderIcon && this.props.alignment == 'right' ? "-5px" : "5px";
		return (0, _lodash.merge)({}, {
			root: {
				display: "block",
				width: "100%",
				transform: 'translateX(' + translateX + ')',
				WebkitTransform: 'translateX(' + translateX + ')',
				textTransform: this.props.uppercase ? "uppercase" : "none"
			},
			menuItem: {
				height: 38,
				minHeight: 38,
				maxHeight: 38,
				width: "100%",
				display: "table",
				textAlign: this.props.alignment
			},
			menuItem_LINK: {
				color: this.props.textColor || this.getThemePalette().primary1Color,
				fontSize: 18,
				textDecoration: "none",
				fontWeight: this.getThemeTypekit().THIN || 200,
				display: "table-cell",
				verticalAlign: "middle"
			}
		});
	}
});

module.exports = NavMenuItem;