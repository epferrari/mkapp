'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
	viewframe: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		width: "100%",
		marginTop: 40,
		minHeight: global.screen.height - 40
	},
	grid: {
		zIndex: 1,
		overflowX: 'hidden',
		overflowY: "scroll"
	},
	content: {
		WebkitOverflowScrolling: "touch"
	}
};

/**
* @name View
* @desc A view wrapper that can enforce certain behaviors for full screen views
* component mounts. Also provides a Bootstrap Grid for children to render into.
*
* @param {string} title - Required
*/
var View = _react2.default.createClass({
	displayName: 'View',

	propTypes: {
		title: _react2.default.PropTypes.string
	},

	render: function render() {
		return _react2.default.createElement(
			'div',
			{ style: (0, _lodash.merge)({}, styles.viewframe, styles.grid), ref: 'view' },
			_react2.default.createElement(
				_reactBootstrap.Grid,
				{ style: (0, _lodash.merge)({}, styles.grid, this.props.style, styles.content) },
				this.props.children
			),
			this.props.static
		);
	}
});

exports.default = View;