import React from 'react';
import {map,merge,reduce} from 'lodash';

import FontIcon
	from '@epferrari/react-fa-icon';

import MuiIcon from './MuiIcon.jsx';
import Router from 'react-router';
import Velocity from 'velocity-animate';
//import TouchLink from './TouchLink.jsx';


var NavMenuItem = React.createClass({
	// TODO update mixin for v1.0
	mixins: [Router.State],
	contextTypes:{
		currentPath: React.PropTypes.string,
		appTheme: React.PropTypes.object
	},

	getInitialState(){
		return {active: false};
	},

	getStyles(){
		let {appTheme} = this.context;
		var _styles = {
			menuItem: {
				height: 38,
				minHeight: 38,
				maxHeight: 38,
				width: "100%",
				display: "table",
				textAlign: "right",
				paddingRight: 8
			},
			menuItem__link:{
				color: appTheme.getPalette().primaryColor,
				fontSize: 18,
				textDecoration:"none",
				fontWeight: appTheme.getTypekit().THIN,
				display: "table-cell",
				verticalAlign: "middle"
			}
		};
		_styles.menuItem__linkActive = merge({},_styles.menuItem__link,{
			color: appTheme.getPalette().secondaryColor
		});
		return merge({},_styles);
	},

	componentWillReceiveProps(nextProps){
		this.setState({
			active: (this.context.currentPath === nextProps.path)
		});
	},

	renderIcon(){
		let {appTheme} = this.context;
		let icon = (this.state.active) ? "navigate-before" : "navigate-next";
		let iconStyle = this.state.active
			? merge({},appTheme.iconNavNext,{color:appTheme.getPalette().secondaryColor})
			: appTheme.iconNavNext;
		return (<MuiIcon icon={icon} style={iconStyle}/>);
	},

	setNextRoute(e){
		e.preventDefault();
		e.stopPropagation();
		if(this.props.onSelection) this.props.onSelection(this.props.path);
	},

	render(){
		let {appTheme} = this.context;
		let styles = this.getStyles();
		let link__style = styles.menuItem__link;
		if(this.isActive(this.props.path,this.props.params,this.props.query)){
			link__style = styles.menuItem__linkActive;
		}
		//let ts = appTheme.getTransitions();
		let ts = {};
		return (
			<div 	onClick={this.setNextRoute} ref="menuItem" style={merge({},styles.menuItem,ts.componentWillEnter)}>
				<div
					to={this.props.path}
					style={link__style}
					activeStyle={styles.menuItem__linkActive}>
						<span style={{verticalAlign: "middle", marginRight: 4}}>{this.props.name}</span>
						{this.renderIcon()}
				</div>
			</div>
		);
	},

	componentDidUpdate(){
		let ts = this.context.appTheme.getTransitions();
		let el = React.findDOMNode(this.refs.menuItem);
		if(this.props.shouldAnimate){
			Velocity(el,ts.componentDidEnter,{delay: this.props.animDelay});
		}else{
			Velocity(el,ts.componentWillEnter,{duration:0});
		}
	}
});


export default NavMenuItem;
