import React
	from 'react';
import ReactDOM
	from 'react-dom';
import Velocity
	from 'velocity-animate';
import Promise
	from 'bluebird';
import {merge,extend}
	from 'lodash';


var styles = {
	overlay: {
		width:"100%",
		height:"100%",
		backgroundColor: 'rgba(0,0,0,0.8)'
	},
	overlay_immutable:{
		position:"absolute",
		overflowX:"hidden",
		overflowY:"scroll",
		backgroundSize:"cover"
	},
	overlay_initial:{
		visibility:"hidden",
		opacity:0,
		zIndex:1
	},
	overlay_animating: {
		visibility: "visible",
		display: "block",
		zIndex: 999999999999
	},
	overlay_active: {
		zIndex: 999999999999,
		opacity:1
	}
};


const Overlay = React.createClass({
	propTypes: {
		open: React.PropTypes.bool,
		position: React.PropTypes.oneOf(['top','left','right','bottom']),
		style: React.PropTypes.object,
		onExit: React.PropTypes.func
	},

	getDefaultProps(){
		return {
			open: false,
			position: 'top',
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

	show(){
		if(this.state.shouldAnimate && !this.isAnimating){
			let node = this.refs.overlay;
			extend(node.style,styles.overlay_animating);
			// wrapping Velocity in a bluebird Promise since Velocity's Promise implementation fails to take the global assigned
			// in app.jsx
			return new Promise(resolve => {
				Velocity(node,this.getActiveStyle(),{
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
		let node = this.refs.overlay;

		if(state.shouldAnimate && !this.isAnimating){
			return new Promise((resolve,reject) => {
				Velocity(node,this.getInitialStyle(),{
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

	capture(e){
		e.stopPropagation();
		e.preventDefault();
	},

	render(){
		let styles = this.prepareStyles();
		return (
			<div style={styles} ref="overlay" onClick={this.capture}>
				{this.props.children}
			</div>
		);
	},

	prepareStyles(){
		let _style = merge({},styles.overlay,this.props.style);

		if(this.state.active){
			merge(_style,this.getActiveStyle(),styles.overlay_immutable);
		} else {
			merge(_style,this.getInitialStyle(),styles.overlay_immutable);
		}

		return _style;
	},

	getInitialStyle(){
		let positions = {
			top: {
				top: "-100%",
				left:0
			},
			left:{
				left: "-100%",
				top:0
			},
			right:{
				right: "-100%",
				top:0
			},
			bottom:{
				left:0,
				bottom:"-100%"
			},
		};
		return merge({},styles.overlay_initial,positions[this.props.position]);
	},

	getActiveStyle(){
		let positions = {
			top: {
				top: "0%",
				left:0
			},
			left:{
				left: "0%",
				top:0
			},
			right:{
				right: "0%",
				top:0
			},
			bottom:{
				left:0,
				bottom:"0%"
			},
		};
		return merge({},styles.overlay_active,positions[this.props.position]);
	}
});

export default Overlay;
