'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _materialUi = require('material-ui');

var _lodash = require('lodash');

var _typeOf = require('@epferrari/js-utils/lib/typeOf');

var _typeOf2 = _interopRequireDefault(_typeOf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var ListFilter = _react2.default.createClass({
	displayName: 'ListFilter',

	propTypes: {
		onChange: _react2.default.PropTypes.func.isRequired,
		count: _react2.default.PropTypes.number,
		hintText: _react2.default.PropTypes.string
	},
	handleInputChange: function handleInputChange() {
		var input = this.refs.input.getValue();
		var filter = undefined;
		if (input.length) {
			filter = new RegExp(input, "i");
		} else {
			filter = /.*/;
		}
		this.props.onChange(filter);
	},
	getStyles: function getStyles() {
		return {
			root: {
				position: "fixed",
				top: 30,
				left: 0,
				right: 0,
				backgroundColor: "#000",
				zIndex: 1,
				borderBottom: "1px solid rgba(70,70,70,0.5)"
			}
		};
	},
	render: function render() {
		var styles = this.getStyles();
		var resultLabel = this.props.count ? this.props.count > 1 ? "Results" : "Result" : "Results";
		return _react2.default.createElement(
			'div',
			{ style: (0, _lodash.merge)({}, styles.root, this.props.style) },
			_react2.default.createElement(
				Row,
				null,
				_react2.default.createElement(
					Col,
					{ xs: 12 },
					_react2.default.createElement(_materialUi.TextField, {
						style: { paddingBottom: 0, width: "100%" },
						ref: 'input',
						hintText: this.props.hintText,
						multiLine: true,
						underlineStyle: { borderColor: "#fff" },
						underlineFocusStyle: { borderColor: "rgb(255,205,17)" },
						onChange: this.handleInputChange })
				)
			),
			_react2.default.createElement(
				Row,
				{ style: { overflow: "visible", paddingBottom: 2 } },
				_react2.default.createElement(
					Col,
					{ style: {
							fontSize: 12,
							marginTop: -8,
							textTransform: "capitalize"
						}, xs: 12 },
					this.props.count,
					' ',
					resultLabel
				)
			)
		);
	}
});

exports.default = ListFilter;