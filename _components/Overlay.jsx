import React
	from 'react';
import ReactDOM
	from 'react-dom';
import Velocity
	from 'velocity-animate';
import Promise
	from 'bluebird';
import {merge,extend,pick}
	from 'lodash';
import MkappThemeMixin
	from '../theme/mixin';
import Touchable
	from './Touchable';
import MuiIcon
	from './MuiIcon';



const Overlay = React.createClass({
	mixins: [MkappThemeMixin],
	propTypes: {
		open: React.PropTypes.bool,
		position: React.PropTypes.oneOf(['top','left','right','bottom']),
		style: React.PropTypes.object,
		onExit: React.PropTypes.func,
		focusOnEnter: React.PropTypes.bool,
		closeButton: React.PropTypes.bool,
		closeButtonStyles: React.PropTypes.object
	},

	getDefaultProps(){
		return {
			open: false,
			position: 'top',
			onExit: function(){ return true; },
			focusOnEnter: true,
			closeButton: true
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
			let {overlay__ANIMATING} = this.getOverlayStyles();
			extend(node.style,overlay__ANIMATING);
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
		let anims = this.getAnimationStyles();
		let closeButton = this.refs.closeButton;

		if(closeButton && this.state.active){
			Velocity(closeButton,anims.componentDidEnter,{delay:450});
		}else if(closeButton){
			Velocity(closeButton,anims.componentWillEnter,{duration:200});
		}

		if(this.state.shouldAnimate){
			this.currentAnimation = this.state.active ? this.hide() : this.show();
		}
	},

	capture(e){
		e.stopPropagation();
		e.preventDefault();
	},

	renderCloseButton(){
		var btnStyles = merge(
			{},{
				color: "rgb(255,255,255)",
				fontSize:16,
				textDecoration:"none",
				fontWeight: 200,
				display:"table",
				width:"100%"
				//position: "absolute",
				//top: 8,
				//right: 8
			},
			pick(this.props.closeButtonStyles,'color','fontWeight')
		);

		var iconStyles = {
			fontSize: 21,
			verticalAlign: "middle",
			paddingTop:8,
			paddingRight:8,
			display: 'table-cell',
			float: "right"
		}

		if(this.props.closeButton){
			return (
				<Touchable onClick={this.forceHide} style={btnStyles}>
					<MuiIcon ref="closeButton" style={iconStyles} icon="clear"/>
				</Touchable>
			);
		}
	},

	render(){
		let preparedStyles = this.prepareStyles();
		let containerStyles = this.getContainerStyles();
		let {shouldAnimate,active} = this.state;

		containerStyles = merge(
			{},
			containerStyles.container,
			((shouldAnimate || active) && containerStyles.container__ACTIVE)
		);

		return (
			<Touchable
				component="div"
				onClick={this.forceHide}
				style={containerStyles}>
				<div style={preparedStyles} ref="overlay" onClick={this.capture} onTouchEnd={this.capture}>
					{this.renderCloseButton()}
					{this.props.children}
				</div>
			</Touchable>
		);
	},

	/* Styling */

	prepareStyles(){
		let {overlay__BASE,overlay__IMMUTABLE} = this.getOverlayStyles();
		let renderStyle = merge({},overlay__BASE,this.props.style);

		if(this.state.active){
			merge(renderStyle,this.getActiveStyle(),overlay__IMMUTABLE);
		} else {
			merge(renderStyle,this.getInitialStyle(),overlay__IMMUTABLE);
		}

		return renderStyle;
	},

	getInitialStyle(){
		let {overlay__INITIAL} = this.getOverlayStyles();
		let offsetTop = this.getThemeStyles('overlay').top || 0;
		let positions = {
			top: {
				top: "-100%",
				left:0
			},
			left:{
				left: "-100%",
				top: offsetTop
			},
			right:{
				right: "-100%",
				top: offsetTop
			},
			bottom:{
				left:0,
				bottom:"-100%"
			},
		};
		return merge({},overlay__INITIAL,positions[this.props.position]);
	},

	getActiveStyle(){
		let {overlay__ACTIVE} = this.getOverlayStyles();
		let offsetTop = this.getThemeStyles('overlay').top || 0;
		let positions = {
			top: {
				top: offsetTop,
				left:0
			},
			left:{
				left: "0%",
				top: offsetTop
			},
			right:{
				right: "0%",
				top: offsetTop
			},
			bottom:{
				left:0,
				bottom:"0%"
			},
		};

		return merge({},overlay__ACTIVE,positions[this.props.position]);
	},

	getOverlayStyles(){
		return {
			overlay__BASE: {
				width:"100%",
				height:"100%",
				backgroundColor: 'rgba(0,0,0,0.8)'
			},
			overlay__IMMUTABLE:{
				position:"fixed",
				overflowX:"hidden",
				overflowY:"scroll",
				backgroundSize:"cover"
			},
			overlay__INITIAL:{
				visibility:"hidden",
				opacity:0,
				zIndex:10
			},
			overlay__ANIMATING: {
				visibility: "visible",
				display: "block",
				zIndex: 999999999999
			},
			overlay__ACTIVE: {
				zIndex: 999999999999,
				opacity:1
			},

		};
	},
	getContainerStyles(){

		let offsetTop = this.getThemeStyles('overlay').top || 0;

		return {
			container: {
				zIndex: -10,
				opacity: 0
			},
			container__ACTIVE: {
				top: offsetTop,
				bottom: 0,
				left: 0,
				right: 0,
				position: "fixed",
				width: "100%",
				height: "100%",
				zIndex: 999999999999,
				opacity: 1,
				transition: "opacity 400ms cubic-bezier(0.23, 1, 0.32, 1) 0ms",
				backgroundColor: this.props.focusOnEnter ? 'rgba(0,0,0,0.25)' : 'transparent'
			}
		};
	},

	getAnimationStyles(){
		/**
		* animation states for velocity-animate
		*/
		return merge({},{
			componentWillEnter:{
				opacity: 0,
				marginLeft: -5,
				marginTop: -5
			},
			componentDidEnter: {
				opacity: 1,
				marginLeft: 0,
				marginTop:0
			},
		});
	}
});

export default Overlay;
