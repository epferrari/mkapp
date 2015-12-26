'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* @desc ensure click handler on iOS by wrapping components in a dummy div with a cursor: pointer style
*/
var Touchable = _react2.default.createClass({
	displayName: 'Touchable',

	propTypes: {
		component: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.func])
	},
	getStyles: function getStyles() {
		return {
			backgroundColor: "transparent",
			border: "none",
			outline: "none",
			display: "inline-block",
			cursor: "pointer"
		};
	},

	/*
 measureDelta(){
 	let {touchInit,touchEnd} = this;
 	this.touchInit = null;
 	this.touchEnd = null;
 	if(touchInit && touchEnd){
 		return (touchInit - touchEnd < 300);
 	} else {
 		return false;
 	}
 },
 	handleTouchStart(e){
 	if(!this.touchTriggered){
 		this.touchTriggered = true;
 		this.touchInit = Date.now();
 		this.touchEvent = e;
 	}
 },
 	handleTouchEnd(){
 	let e = this.touchEvent;
 	this.touchEvent = null;
 	this.touchEnd = Date.now();
 	if(this.measureDelta() && this.props.onClick){
 		this.blockClicks = true;
 		this.timeout = setTimeout(() => {
 			this.touchTriggered = false;
 			this.blockClicks = false;
 		},400);
 		e.preventDefault();
 		e.stopPropagation();
 		this.props.onClick(e);
 	}
 },
 	handleClick(e){
 	if(!this.blockClicks && this.props.onClick) this.props.onClick(e);
 },
 */
	/* a more elegant approach? */
	handleTouchStart: function handleTouchStart(e) {
		var _this = this;

		this.touchEvent = e;
		this.touchTimeout = setTimeout(function () {
			clearTimeout(_this.touchTimeout);
			_this.touchTimout = null;
		}, 400);
	},
	handleTouchEnd: function handleTouchEnd() {
		if (this.touchTimeout) {
			var e = this.touchEvent;
			if (e) {
				e.stopPropagation();
				e.preventDefault();
			}
			this.touchEvent = null;
			if (this.props.onClick) this.props.onClick(e);
		}
	},
	handleClick: function handleClick(e) {
		if (!this.touchTimeout && this.props.onClick) {
			this.props.onClick(e);
		}
	},
	render: function render() {
		var Component = this.props.component ? _react2.default.createElement(this.props.component, { style: this.props.style }, this.props.children) : _react2.default.createElement('div', { style: (0, _lodash.merge)({}, this.props.style, this.getStyles()) });

		var props = (0, _lodash.merge)({}, this.props);
		delete props.component;
		delete props.style;

		props.onClick = this.handleClick;
		props.onTouchEnd = this.handleTouchEnd;
		props.onTouchStart = this.handleTouchStart;

		return _react2.default.cloneElement(Component, props, this.props.children);
		/*
  return (
  	<div
  		{...this.props}
  		onTouchStart={this.handleTouchStart}
  		onTouchEnd={this.handleTouchEnd}
  		onClick={this.handleClick}
  		className="clear-button"
  		style={merge({},this.props.style,this.getStyles())}>
  		{this.props.children}
  	</div>
  );
  */
	}
});

exports.default = Touchable;