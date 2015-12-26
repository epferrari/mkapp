import React from 'react';
import {merge} from 'lodash';

/**
* @desc ensure click handler on iOS by wrapping components in a dummy div with a cursor: pointer style
*/
var Touchable = React.createClass({
	propTypes:{
		component: React.PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.func
		])
	},
	getStyles(){
		return {
			backgroundColor: "transparent",
			border: "none",
			outline: "none",
			display:"inline-block",
			cursor:"pointer"
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
	handleTouchStart(e){
		this.touchEvent = e;
		this.touchTimeout = setTimeout(() => {
			clearTimeout(this.touchTimeout);
			this.touchTimout = null;
		},400);
	},
	handleTouchEnd(){
		if(this.touchTimeout){
			let e = this.touchEvent;
			if(e){
				e.stopPropagation();
				e.preventDefault();
			}
			this.touchEvent = null;
			if(this.props.onClick) this.props.onClick(e);
		}
	},
	handleClick(e){
		if(!this.touchTimeout && this.props.onClick){
			this.props.onClick(e);
		}
	},
	render(){
		let Component = this.props.component ?
			React.createElement(this.props.component,{style: this.props.style},this.props.children)
			: React.createElement('div',{style: merge({},this.props.style,this.getStyles())} );

		let props = merge({},this.props);
		delete props.component;
		delete props.style;

		props.onClick = this.handleClick;
		props.onTouchEnd = this.handleTouchEnd;
		props.onTouchStart = this.handleTouchStart;

		return React.cloneElement(Component,props,this.props.children);
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

export default Touchable;
