'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Touchable = require('../Touchable');

var _Touchable2 = _interopRequireDefault(_Touchable);

var _Column = require('../gridsystem/Column');

var _Column2 = _interopRequireDefault(_Column);

var _reactFaIcon = require('@epferrari/react-fa-icon');

var _reactFaIcon2 = _interopRequireDefault(_reactFaIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buttonStyles = {
	margin: 0,
	padding: 0,
	paddingTop: 4,
	border: "none",
	background: "none",
	float: "right",
	paddingBottom: 0,
	color: 'inherit',
	cursor: 'pointer'
};

var MenuButtonRight = _react2.default.createClass({
	displayName: 'MenuButtonRight',

	propTypes: {
		show: _react2.default.PropTypes.bool,
		onClick: _react2.default.PropTypes.func.isRequired,
		label: _react2.default.PropTypes.string,
		iconElement: _react2.default.PropTypes.element
	},
	getDefaultProps: function getDefaultProps() {
		return {
			show: true,
			iconElement: _react2.default.createElement(_reactFaIcon2.default, { icon: 'bars' })
		};
	},
	render: function render() {
		var _this = this;

		if (this.props.show) {
			return _react2.default.createElement(
				_Touchable2.default,
				{
					component: _Column2.default,
					width: 3,
					onClick: function onClick(e) {
						e.stopPropagation();
						/*this.showMenu();*/
						_this.props.onClick(e);
					},
					style: { paddingRight: 8 } },
				_react2.default.createElement(
					'div',
					{ style: buttonStyles },
					this.props.label,
					' ',
					this.props.iconElement
				)
			);
		} else {
			return _react2.default.createElement(_Column2.default, { width: 3 });
		}
	}
});

module.exports = MenuButtonRight;