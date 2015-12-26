import React
	from 'react';
import {map,merge,reduce}
	from 'lodash';
import Router
	from 'react-router';
import Velocity
	from 'velocity-animate';
import FontIcon
	from '@epferrari/react-fa-icon';
import MuiIcon
	from './MuiIcon';
import MkappThemeMixin
	from '../theme/mixin';
import Touchable
	from './Touchable';

	var transitions = {
		componentWillEnter:{
			opacity: 0,
			marginLeft: -5,
			marginTop: -5
		},
		componentDidEnter: {
			opacity: 1,
			marginLeft: 0,
			marginTop:0
		}
	};


var NavMenuItem = React.createClass({
	mixins: [MkappThemeMixin],
	contextTypes:{
		location: React.PropTypes.object
	},

	getInitialState(){
		return {active: false};
	},

	getStyles(){
		var styles = {
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
				color: (this.getThemePalette().primary1Color || 'rgb(255,255,255)'),
				fontSize: 18,
				textDecoration:"none",
				fontWeight: (this.getThemeTypekit().THIN || 200),
				display: "table-cell",
				verticalAlign: "middle"
			}
		};

		var _styles = merge({},styles);
		_styles.menuItem__linkActive = merge({},styles.menuItem__link,{
			color: (this.getThemePalette().accent1Color || 'rgb(66, 198, 215)')
		});

		return merge({},_styles);
	},

	componentWillReceiveProps(nextProps){
		this.setState({
			active: (this.context.location.pathname === nextProps.path)
		});
	},

	renderIcon(){
		let icon = (this.state.active) ? "navigate-before" : "navigate-next";
		let iconStyle = this.getThemeStyles('iconNavNext');
		if(this.state.active){
			merge(iconStyle,{ color: this.getThemePalette().accent1Color});
		}
		return (<MuiIcon icon={icon} style={iconStyle}/>);
	},

	setNextRoute(e){
		e.preventDefault();
		e.stopPropagation();
		if(this.props.onSelection) this.props.onSelection(this.props.path);
	},

	render(){
		let styles = this.getStyles();
		let link__style = styles.menuItem__link;
		if(this.state.active){
			link__style = styles.menuItem__linkActive;
		}
		let ts = {};
		return (
			<Touchable style={{width:"100%",display:"block"}} onClick={this.setNextRoute}>
				<div
					ref="menuItem"
					style={merge({},styles.menuItem,ts.componentWillEnter)}>
					<div
						to={this.props.path}
						style={link__style}
						activeStyle={styles.menuItem__linkActive}>
							<span style={{verticalAlign: "middle", marginRight: 4}}>{this.props.name}</span>
							{this.renderIcon()}
					</div>
				</div>
			</Touchable>
		);
	},

	componentDidUpdate(){
		let ts = transitions;
		let el = this.refs.menuItem;
		if(this.props.shouldAnimate){
			Velocity(el,ts.componentDidEnter,{delay: this.props.animDelay});
		}else{
			Velocity(el,ts.componentWillEnter,{duration:0});
		}
	}
});


export default NavMenuItem;
