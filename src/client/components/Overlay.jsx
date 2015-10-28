import React from 'react';

import Velocity from 'velocity-animate';

import Promise
	from 'bluebird';

import {merge,extend} from 'lodash';


var styles = 	{
	overlay: {
		position:"absolute",
		width:"100%",
		height:"100%",
		overflowX:"hidden",
		overflowY:"scroll",
		background:"url(./assets/img/main-BG-interior.jpg)",
		backgroundSize:"cover"
		//backgroundColor:"rgba(48, 135, 157, 0.9)"
		//borderLeft: "4px solid rgba(255,205,17,0.9)",

	},
	initial: {
		visibility:"hidden",
		opacity:0,
		zIndex:1,
		top: "-100%",
		left:0
	},
	animating: {
		visibility: "visible",
		display: "block",
		zIndex: 999999999999
	},
	active: {
		zIndex: 999999999999,
		top:"0%",
		opacity:1
	}
};


const Overlay = React.createClass({
	propTypes: {
		open: React.PropTypes.bool,
		onExit: React.PropTypes.func
	},

	getDefaultProps(){
		return {
			open: false,
			onExit: function(){ return true; }
		};
	},

	getInitialState(){
		return {
			active: false,
			shouldAnimate: false,
			didAnimate: false
		};
	},

	getDomNode(){
		return React.findDOMNode(this.refs.overlay);
	},

	show(){
		if(this.state.shouldAnimate && !this.isAnimating){
			let overlay = this.getDomNode();
			extend(overlay.style,styles.animating);
			// wrapping Velocity in a bluebird Promise since Velocity's Promise implementation fails to take the global assigned
			// in app.jsx
			return new Promise((resolve,reject) => {
				Velocity(overlay,styles.active,{
					duration: 300,
					complete: resolve
				});
			})
			.then(() => {
				this.setState({
					shouldAnimate: false,
					didAnimate: true,
					active: true
				});
			});
		} else {
			return this.currentAnimation;
		}
	},

	hide(){
		let state = this.state;
		let node = this.getDomNode();

		if(state.shouldAnimate && !this.isAnimating){
			return new Promise((resolve,reject) => {
				Velocity(node,styles.initial,{
					duration:300,
					complete: resolve
				});
			})
			.then(() => {
				this.isAnimating = false;
				this.props.onExit();
				this.setState({
					shouldAnimate: false,
					didAnimate: true,
					active: false
				});
			});
		} else {
			return this.currentAnimation;
		}
	},

	componentWillReceiveProps(nextProps){
		this.setState({shouldAnimate: (nextProps.open !== this.props.open)});
	},

	componentDidUpdate(){
		if(this.state.shouldAnimate){
			this.currentAnimation = this.state.active ? this.hide() : this.show();
		}
	},

	render(){
		let $style = merge({},styles.overlay,styles.initial);
		merge($style,styles[this.state.active ? "active" : "initial"]);

		return (
			<div style={merge({},this.props.style,$style)} ref="overlay">
				{this.props.children}
			</div>
		);
	}

});

export default Overlay;
