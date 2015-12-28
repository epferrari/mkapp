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

var AppNav = React.createClass({

	mixins: [History,MkappThemeMixin],

	propTypes:{
		title: React.PropTypes.string,
		isLoading: React.PropTypes.bool,
		connectionStatus: React.PropTypes.number,
		navbarColor: React.PropTypes.string,
		menuItems: React.PropTypes.arrayOf(
			React.PropTypes.shape({
				path: React.PropTypes.string.isRequired,
				label: React.PropTypes.string,
				title: React.PropTypes.string
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
			menuActive: false
		};
	},

	showMenu(){
		if(!this.state.menuActive){
			this.setState({
				menuActive: true,
				menuAnimating: true
			});
		}
	},

	hideMenu(){
		this.setState({
			menuActive: false,
			menuAnimating: true
		});
	},

	closeAndRoute(nextRoute){
		this.setState({
			nextRoute: nextRoute,
			menuActive: false,
			menuAnimating: true
		});
	},

	menuDidLeave(){
		let nextRoute = this.state.nextRoute;
		this.setState({
			menuActive: false,
			menuAnimating:false,
			nextRoute: null
		});
		if(nextRoute) this.history.pushState(null,nextRoute);
	},

	render(){
		let styles = this.prepareStyles();
    let navbarProps = pick(this.props,[
      'textColor',
      'navbarColor',
      'title',
      'menuButtonLabel',
      'menuButtonIconElement',
      'connectionStatus'
    ]);

		let childCount = React.Children.count(this.props.children);
    if(childCount === 1 || childCount > 2){
      throw new Error('AppNav accepts exactly 2 children, a NavBar component and a NavMenu component. Check the render method of AppNav');
    }
		if(childCount === 0){
			return (
				<div style={styles.appnav} onClick={() => this.hideMenu()}>
					<NavBar {...navbarProps} showActivity={this.props.isLoading} onMenuButtonClick={this.showMenu}/>
					<NavMenu
						open={this.state.menuActive}
						onExit={this.menuDidLeave}
						style={styles.menu_OVERLAY}
						closeButtonStyles={styles.menu_CLOSE_BUTTON}
						menuItems={this.props.menuItems}
						onRouteSelection={this.closeAndRoute}/>
				</div>
			);
		} else {
			return (
				<div style={styles.appnav} onClick={() => this.hideMenu()}>
	        {React.Children.map(this.props.children,(child,index) => {
	          if(index === 0){
	            // NavBar Component
	            return React.cloneElement(child,merge(
	                {},
	                navbarProps,
	                {
	                  showActivity: this.props.isLoading,
	                  onMenuButtonClick: this.showMenu
	                }
	              )
	            );
	          } else if(index === 1){
	            // Menu Component
	            return React.cloneElement(child,{
	              open: this.state.menuActive,
	              onExit: this.menuDidLeave,
	              style: merge({},styles.menu_OVERLAY,child.props.style),
	              closeButtonStyles: merge({},styles.menu_CLOSE_BUTTON,child.props.closeButtonStyles),
	              menuItems: this.props.menuItems,
	              onRouteSelection: this.closeAndRoute
	            });
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
