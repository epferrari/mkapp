import React
	from 'react';
import MkappTheme
	from '../theme';
import {merge}
	from 'lodash';

/**
*
* @name ThemeProvider
* @desc The `ThemeProvider` component is a convenient top-level wrapper for your
	entire application's `mkapp` components. It takes care of setting a theme on
	context, doing device detection, and updating the theme accordingly. If you're
	planning on using mkapp as part of a Cordova project to build javascript
	apps for native devices, use the `ThemeProvider` and [hybrid components](#).
* @param {object} [mkappTheme=<MkappTheme instance>] - a `MkappTheme` instance
* @param {boolean} [detectDevice=true] - Should the ThemeProvider listen to Cordova's
	`deviceready` event and respond by updating some styles internally?
* @param {boolean} [autoUpdate=true] - Should the ThemeProvider update all components
	in its render tree when its theme is updated?
* @param {boolean} [expectStatusBar=true] - Should the ThemeProvider add extra padding
	to the navigation bar and views to offset for a device status bar?
	`detectDevice` must be set to true for this to take effect
*/
var ThemeProvider = React.createClass({
	propTypes:{
		detectDevice: React.PropTypes.bool,
		autoUpdate: React.PropTypes.bool,
		expectStatusBar: React.PropTypes.bool
	},
	getDefaultProps(){
		return {
			detectDevice: true,
			autoUpdate: true,
			expectStatusBar: true
		};
	},
	getInitialState(){
		return {
			cordovaDeviceReady: false,
			cordovaPlatform: 'browser',
			mkappTheme: this.props.mkappTheme || new MkappTheme()
		};
	},

	componentWillMount(){
		document.addEventListener('deviceready',() => {
			let platform = (global.device) ? global.device.platform : "browser";
			let theme = this.state.mkappTheme;
			if(this.props.detectDevice){
				theme.setOptions({
					onDevice: true,
					platform: platform,
					expectStatusBar: this.props.expectStatusBar
				});
			}
			this.setState({
				cordovaDeviceReady: true,
				cordovaPlatform: platform,
				mkappTheme: theme
			});
		});
	},

	componentDidMount(){
		// ensure a re-render is triggered when mkappTheme is updated
		let theme = this.state.mkappTheme;
		if(this.props.autoUpdate){
			theme.on('update',() => {
				this.forceUpdate();
			});
		}
	},

	componentWillReceiveProps(nextProps){
		// reset theme-update listener when new theme is passed via props
		let {nextTheme} = nextProps;
		let currentTheme = this.state.mkappTheme;
		if(nextTheme && nextTheme._id !== currentTheme._id){
			// update the state theme with new theme passed from props
			if(this.state.cordovaDeviceReady){
				if(this.props.detectDevice || nextProps.detectDevice){
					nextTheme.setOptions({
						onDevice: this.state.cordoveDeviceReady,
						platform: this.state.cordovaPlatform,
						expectStatusBar: nextProps.expectStatusBar
					});
				}
			}
			currentTheme.removeAllListeners();
			if(this.props.autoUpdate || nextProps.autoUpdate){
				nextTheme.on('update',() => this.forceUpdate());
			}
			this.setState({mkappTheme: nextTheme});
		}else{
			currentTheme.setOptions({
				expectStatusBar: nextProps.expectStatusBar
			});
		}
	},

	getChildContext(){
		return {
			mkappTheme: this.state.mkappTheme,
			cordovaDeviceReady: this.state.cordovaDeviceReady,
			cordovaPlatform: this.state.cordovaPlatform
		};
	},

	childContextTypes:{
		mkappTheme: React.PropTypes.object.isRequired,
		cordovaDeviceReady: React.PropTypes.bool,
		cordovaPlatform: React.PropTypes.any
	},

	render(){
		let props = merge({},this.props);
		delete props.mkappTheme;
		delete props.children;
		return (
			<div>
				{React.Children.map(this.props.children, (child) => React.cloneElement(child,props))}
			</div>
		);
	}
});

export default ThemeProvider;
