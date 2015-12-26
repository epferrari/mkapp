'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _reactRouter = require('react-router');

var _reactRouter2 = _interopRequireDefault(_reactRouter);

var _velocityAnimate = require('velocity-animate');

var _velocityAnimate2 = _interopRequireDefault(_velocityAnimate);

var _reactFaIcon = require('@epferrari/react-fa-icon');

var _reactFaIcon2 = _interopRequireDefault(_reactFaIcon);

var _MuiIcon = require('./MuiIcon');

var _MuiIcon2 = _interopRequireDefault(_MuiIcon);

var _mixin = require('../theme/mixin');

var _mixin2 = _interopRequireDefault(_mixin);

var _Touchable = require('./Touchable');

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
	contextTypes: {
		location: _react2.default.PropTypes.object
	},

	getInitialState: function getInitialState() {
		return { active: false };
	},
	getStyles: function getStyles() {
		var styles = {
			menuItem: {
				height: 38,
				minHeight: 38,
				maxHeight: 38,
				width: "100%",
				display: "table",
				textAlign: "right",
				paddingRight: 8
			},
			menuItem__link: {
				color: this.getThemePalette().primary1Color || 'rgb(255,255,255)',
				fontSize: 18,
				textDecoration: "none",
				fontWeight: this.getThemeTypekit().THIN || 200,
				display: "table-cell",
				verticalAlign: "middle"
			}
		};

		var _styles = (0, _lodash.merge)({}, styles);
		_styles.menuItem__linkActive = (0, _lodash.merge)({}, styles.menuItem__link, {
			color: this.getThemePalette().accent1Color || 'rgb(66, 198, 215)'
		});

		return (0, _lodash.merge)({}, _styles);
	},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		this.setState({
			active: this.context.location.pathname === nextProps.path
		});
	},
	renderIcon: function renderIcon() {
		var icon = this.state.active ? "navigate-before" : "navigate-next";
		var iconStyle = this.getThemeStyles('iconNavNext');
		if (this.state.active) {
			(0, _lodash.merge)(iconStyle, { color: this.getThemePalette().accent1Color });
		}
		return _react2.default.createElement(_MuiIcon2.default, { icon: icon, style: iconStyle });
	},
	setNextRoute: function setNextRoute(e) {
		e.preventDefault();
		e.stopPropagation();
		if (this.props.onSelection) this.props.onSelection(this.props.path);
	},
	render: function render() {
		var styles = this.getStyles();
		var link__style = styles.menuItem__link;
		if (this.state.active) {
			link__style = styles.menuItem__linkActive;
		}
		var ts = {};
		return _react2.default.createElement(
			_Touchable2.default,
			{ style: { width: "100%", display: "block" }, onClick: this.setNextRoute },
			_react2.default.createElement(
				'div',
				{
					ref: 'menuItem',
					style: (0, _lodash.merge)({}, styles.menuItem, ts.componentWillEnter) },
				_react2.default.createElement(
					'div',
					{
						to: this.props.path,
						style: link__style,
						activeStyle: styles.menuItem__linkActive },
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
			(0, _velocityAnimate2.default)(el, ts.componentDidEnter, { delay: this.props.animDelay });
		} else {
			(0, _velocityAnimate2.default)(el, ts.componentWillEnter, { duration: 0 });
		}
	}
});

exports.default = NavMenuItem;