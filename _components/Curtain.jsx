import React
	from 'react';
import Overlay
	from './Overlay';
import ThemeStyleMerger
	from '../theme/utils/styleMerger';
import {pick}
	from 'lodash';
import MkappThemeMixin
	from '../theme/mixin';


var Curtain = React.createClass({
	mixins: [MkappThemeMixin],
	propTypes: {
		open: React.PropTypes.bool,
		style: React.PropTypes.object,
		onExit: React.PropTypes.func
	},
	prepareStyles(){
		var defaultStyles = {
			bgColor:'rgba(0,0,0,0.8)',
			color: 'rgb(255,255,255)'
		};
		let okStyles = ['backgroundColor','color'];
		let _styles = pick(ThemeStyleMerger(this.props.style,this.getThemeStyles('curtain'),defaultStyles),okStyles);
		_styles.height = global.screenHeight;
		_styles.maxHeight = global.screenHeight;
		_styles.minHeight = global.screenHeight;
		return _styles;
	},
	render(){
		return (
			<Overlay
				focusOnEnter={false}
				closeButton={true}
				{...this.props}
				style={this.prepareStyles()}
				position="top">
				{this.props.children}
			</Overlay>
		);
	}
});

export default Curtain;
