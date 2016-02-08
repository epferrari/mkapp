import React
	from 'react';
import Overlay
	from './Overlay';
import ThemeStyleMerger
	from '../theme/utils/styleMerger';
import {pick,merge}
	from 'lodash';
import MkappThemeMixin
	from '../theme/mixin';



var DrawerRight = React.createClass({
	mixins: [MkappThemeMixin],
	propTypes: {
		open: React.PropTypes.bool,
		style: React.PropTypes.object,
		willExit: React.PropTypes.func,
		didExit: React.PropTypes.func,
		didEnter: React.PropTypes.func
	},
	prepareStyles(){
		var defaultStyles = {
			width:"70%",
			maxWidth:300,
			bgColor:'rgb(0,0,0)',
			color:"rgb(255,255,255)",
			boxShadow: "rgba(0,0,0,0.5) -2px 2px 6px"
		};
		var okStyles = ['backgroundColor', 'color', 'width', 'minWidth', 'maxWidth','boxShadow'];
		let themeStyles =  merge({},this.getThemeStyles('drawer'),this.getThemeStyles('drawerRight'));
		return pick(ThemeStyleMerger(this.props.style,themeStyles,defaultStyles),okStyles);
	},
	render(){
		return (
			<Overlay
				closeButton={false}
				{...this.props}
				style={this.prepareStyles()}
				position="right">
				{this.props.children}
			</Overlay>
		);
	}
});

export default DrawerRight;
