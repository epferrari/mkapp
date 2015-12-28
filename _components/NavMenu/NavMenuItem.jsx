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
	from '../MuiIcon';
import MkappThemeMixin
	from '../../theme/mixin';
import Touchable
	from '../Touchable';


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
	propTypes: {
		uppercase: React.PropTypes.bool,
		textColor: React.PropTypes.string,
		activeTextColor: React.PropTypes.string,
		onSelection: React.PropTypes.func.isRequired,
		path: React.PropTypes.string,
		name: React.PropTypes.string,
		alignment: React.PropTypes.oneOf(['left','right']),
		renderIcon: React.PropTypes.bool
	},
	getDefaultProps(){
		return {
			uppercase: true,
			renderIcon: true,
			alignment: 'right',
			onSelection: function(){}
		};
	},
	contextTypes:{
		location: React.PropTypes.object
	},

	getInitialState(){
		return {active: false};
	},

	componentWillReceiveProps(nextProps){
		this.setState({
			active: (this.context.location.pathname === nextProps.path)
		});
	},

	renderIcon(){
		if(this.props.renderIcon && this.props.alignment === 'right'){
			let icon = (this.state.active) ? "navigate-before" : "navigate-next";
			let iconStyle = this.getThemeStyles('navMenuChevron');
			if(this.state.active){
				merge(iconStyle,{ color: this.getThemePalette().accent1Color});
			}
			return (<MuiIcon icon={icon} style={iconStyle}/>);
		}
	},

	setNextRoute(e){
		e.preventDefault();
		e.stopPropagation();
		if(this.props.onSelection) this.props.onSelection(this.props.path);
	},

	render(){
		let styles = this.prepareStyles();
		return (
			<div style={styles.root}>
				<div
					ref="menuItem"
					style={styles.menuItem}>
					<Touchable
						onClick={this.setNextRoute}
						style={styles.menuItem_LINK}>
						<span style={{verticalAlign: "middle", marginRight: 4}}>{this.props.name}</span>
						{this.renderIcon()}
					</Touchable>
				</div>
			</div>
		);
	},

	componentDidUpdate(){
		let ts = transitions;
		let el = this.refs.menuItem;
		if(this.props.shouldAnimate){
			Velocity(el,ts.componentDidEnter,{
				delay: this.props.animationDelay,
				progress: function(elements){
					// hackosaurus rex for keeping the fixed position during transformation
					elements.forEach(el => el.style.transform = "");
				}
			});
		}else{
			Velocity(el,ts.componentWillEnter,{duration:0});
		}
	},

	prepareStyles(){
		let styles = this.getBaseStyles();
		if(this.state.active){
			styles.menuItem_LINK = merge({},styles.menuItem_LINK,{
				color: (this.props.activeTextColor || this.getThemePalette().accent1Color)
			});
		}
		return styles;
	},

	getBaseStyles(){
		let translateX = (!this.props.renderIcon && this.props.alignment == 'right') ? "-5px" : "5px";
		return merge({},{
			root:{
				display:"block",
				width:"100%",
				transform: `translateX(${translateX})`,
				WebkitTransform: `translateX(${translateX})`,
				textTransform: this.props.uppercase ? "uppercase" : "none",
				paddingTop: 8
			},
			menuItem: {
				height: 38,
				minHeight: 38,
				maxHeight: 38,
				width: "100%",
				display: "table",
				textAlign: this.props.alignment
			},
			menuItem_LINK:{
				color: (this.props.textColor || this.getThemePalette().primary1Color),
				fontSize: 18,
				textDecoration:"none",
				fontWeight: (this.getThemeTypekit().THIN || 200),
				display: "table-cell",
				verticalAlign: "middle"
			}
		});
	}
});


module.exports = NavMenuItem;
