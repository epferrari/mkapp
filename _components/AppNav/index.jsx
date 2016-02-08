import React
	from 'react';
import ReactDOM
	from 'react-dom';
import {map,merge,contains,pick}
	from 'lodash';
import {History}
	from 'react-router';
import MkappThemeMixin
	from '../../theme/mixin';
import MkappThemeStyleMerger
	from '../../theme/utils/styleMerger';
import NavBar
	from '../NavBar';
import NavMenu
	from '../NavMenu';

var s = {
	DID_OPEN: 6,
	IS_OPENING: 5,
	SHOULD_OPEN: 4,
	SHOULD_CLOSE: 3,
	IS_CLOSING: 2,
	DID_CLOSE: 1
};

var AppNav = React.createClass({

	mixins: [History,MkappThemeMixin],

	childContextTypes: {
		closeMenu: React.PropTypes.func
	},

	getChildContext(){
		return {
			closeMenu: this.closeMenu
		};
	},

	propTypes:{
		title: React.PropTypes.string,
		isLoading: React.PropTypes.bool,
		connectionStatus: React.PropTypes.number,
		navbarColor: React.PropTypes.string,
		menuItems: React.PropTypes.arrayOf(
			React.PropTypes.shape({
				path: React.PropTypes.string,
				label: React.PropTypes.string,
				title: React.PropTypes.string,
				onSelection: React.PropTypes.func
			})
		),
		menuStyle: React.PropTypes.object,
		menuButtonLabel: React.PropTypes.string,
		menuButtonIconElement: React.PropTypes.element
	},

	getDefaultProps(){
		return {
			menuItems: [],
			usemkappTheme: true,
			menuPosition: "right"
		};
	},

	getInitialState(){
		return {
			menuState: s.DID_CLOSE,
			nextRoute: null
		};
	},

	openMenu(){
		if(this.isMounted() && (this.state.menuState === s.DID_CLOSE)){
			this.setState({ menuState: s.SHOULD_OPEN });
		}
	},

	closeMenu(path){
		if(this.isMounted() && (this.state.menuState === s.DID_OPEN)){
			this.setState({
				nextRoute: path,
				menuState: s.SHOULD_CLOSE
			});
		}
	},

	// callback for animating overlay onEnter
	menuDidOpen(){
		if(this.isMounted() && this.state.menuState === s.IS_OPENING){
			this.setState({ menuState: s.DID_OPEN });
		}
	},

	// callback for animating overlay onExit
	menuDidClose(){
		if(this.isMounted() && this.state.menuState === s.IS_CLOSING){
			this.setState({ menuState: s.DID_CLOSE });
		}
	},

	componentDidUpdate(){
		let {menuState} = this.state;
		switch(this.state.menuState){

			case s.SHOULD_OPEN :
				this.setState({ menuState: s.IS_OPENING });
				break;

			case s.SHOULD_CLOSE :
				this.setState({ menuState: s.IS_CLOSING });
				break;

			case s.DID_CLOSE :
				let {nextRoute} = this.state;
				if(nextRoute){
					this.history.pushState(null,nextRoute);
					this.setState({ nextRoute: null });
				}
		}
	},


	renderNavMenu(component,styles){
		if(this.state.menuState > s.DID_CLOSE){
			return React.cloneElement(component,{
				open: (this.state.menuState > s.SHOULD_OPEN),
				willExit: this.closeMenu,
				didExit: this.menuDidClose,
				didEnter: this.menuDidOpen,
				style: merge({},styles.menu_OVERLAY, (component.props || {}).style),
				closeButtonStyles: merge({},styles.menu_CLOSE_BUTTON,(component.props || {}).closeButtonStyles),
				menuItems: this.props.menuItems,
				onNavSelection: this.closeMenu
			});
		}else{
			return null;
		}
	},


	render(){
		let styles = this.prepareStyles();
		let navbarProps = pick(this.props,[
			'navbarTextColor',
			'navbarColor',
			'title',
			'menuButtonLabel',
			'menuButtonIconElement',
			'connectionStatus'
		]);

		navbarProps.textColor = navbarProps.navbarTextColor;
		delete navbarProps.navbarTextColor;

		let childCount = React.Children.count(this.props.children);
		if(childCount === 1 || childCount > 2){
			throw new Error('AppNav accepts exactly 2 children, a NavBar component and a NavMenu component. Check the render method of AppNav');
		}
		// no children were passed, render a default Navbar and NavMenu component
		if(childCount === 0){
			return (
				<div style={styles.appnav} onClick={() => this.closeMenu()}>
					<NavBar {...navbarProps} showActivity={this.props.isLoading} onMenuButtonClick={this.openMenu}/>
					{this.renderNavMenu(NavMenu,styles)}
				</div>
			);
		} else {
			return (
				<div style={styles.appnav} onClick={() => this.closeMenu(null)}>
					{React.Children.map(this.props.children,(child,index) => {
						if( index === 0 ){
							// NavBar Component
							return React.cloneElement(child,merge({},navbarProps,{showActivity: this.props.isLoading, onMenuButtonClick: this.openMenu}));
						} else if( index === 1 ){
							// NavMenu Component
							return this.renderNavMenu(child,styles)
						}
					})}
				</div>
			);
		}
	},

	prepareStyles(){
		let baseStyles = this.getBaseStyles();
		let menuStyles = {
			props: (this.props.menuStyle || {}),
			theme: this.getThemeStyles('navMenu'),
			merged: {}
		};

		// only allow subset of styles to be overridden
		let menuStyleKeys = [
			'backgroundColor',
			'backgroundPosition',
			'backgroundRepeat',
			'backgroundSize',
			'width',
			'maxWidth',
			'minWidth',
			'color',
			'fontWeight'
		];

		menuStyles.merged = pick(
			MkappThemeStyleMerger(menuStyles.props,menuStyles.theme),
			menuStyleKeys
		);

		// render with full screen height or collapsed navbar height
		let menuActive = (this.state.menuActive);

		return merge({},baseStyles,{
			appnav: merge({},baseStyles.appnav_BASE,(menuActive && baseStyles.appnav_OPEN) ),
			menu_OVERLAY: merge({},menuStyles.merged),
			menu_CLOSE_BUTTON: merge({},menuStyles.merged,this.props.closeButtonStyles)
		});
	},

	getBaseStyles(){
		return merge({},{
			/**
			* animation states for velocity-animate
			*/
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
			appnav_BASE: {
				position:"fixed",
				top:0,
				left:0,
				right:0,
				zIndex: 1,
				WebkitOverflowScrolling: "touch"
			},
			appnav_OPEN:{
				bottom:0,
				height:"100%",
				minHeight:"100%",
				maxHeight:"100%",
				zIndex:999999999
			}
		});
	}
});


export default AppNav;
