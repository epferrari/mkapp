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
		position:"fixed",
		overflowX:"hidden",
		overflowY:"scroll",
		backgroundSize:"cover"
	},
	overlay_initial:{
		visibility:"hidden",
		opacity:0,
		zIndex:10
	},
	overlay_animating: {
		visibility: "visible",
		display: "block",
		zIndex: 999999999999
	},
	overlay_active: {
		zIndex: 999999999999,
		opacity:1
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
					duration: 350,
					complete: resolve,
					progress: function(elements){
						// hackosaurus rex for keeping the fixed position during transformation
						elements.forEach(el => el.style.transform = "");
					}
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
					complete: resolve,
					progress: function(elements){
						// hackosaurus rex for keeping the fixed position during transformation
						elements.forEach(el => el.style.transform = "");
					}
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
			});
		} else {
			return this.currentAnimation;
		}
	},

	forceHide(){
		this.setState({shouldAnimate:true});
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
		let _styles = this.prepareStyles();
		let {shouldAnimate,active} = this.state;
		return (
			<div
				onClick={this.forceHide}
				style={merge({},styles.overlay_container,(shouldAnimate || active) ? styles.overlay_container_active : {})}>
				<div style={_styles} ref="overlay" onClick={this.capture}>
					{this.props.children}
				</div>
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
