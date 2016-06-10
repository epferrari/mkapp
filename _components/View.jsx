import React
	from 'react';
import Container
	from './gridsystem/Container';
import {merge,pick}
	from 'lodash';
import MkappThemeMixin
	from '../theme/mixin';
import MkappThemeStyleMerger
	from '../theme/utils/styleMerger';

function copy(object){
	return merge({},object);
}


/**
* @name View
* @desc A view wrapper that can enforce certain behaviors for full screen views
* component mounts. Also provides a Bootstrap Grid for children to render into.
*
* @param {function|array} static - element or elements to render outside the Grid component.
* 	Good for drawers, modals, and fixed position elements like footers
*/
const View = React.createClass({
	mixins:[MkappThemeMixin],

	propTypes:{
		static: React.PropTypes.oneOfType([
			React.PropTypes.element,
			React.PropTypes.arrayOf(React.PropTypes.element)
		]),
		navbarOffset: React.PropTypes.number
	},

	getDefaultProps(){
		return {navbarOffset: 30};
	},

	render(){
		let styles = this.prepareStyles();
		let propsStyles = merge({},this.props.style);
		let bgStyles = pick(MkappThemeStyleMerger(this.props.style,this.getThemeStyles('view')),'backgroundColor');
		delete propsStyles.backgroundColor;
		return (
			<div style={styles.outer}>
				<div style={merge({},styles.viewframe,bgStyles)} ref="view">
					<Container style={merge({},styles.container,propsStyles,styles.content)}>
						{this.props.children}
					</Container>
				</div>
				{this.props.static}
			</div>
		);
	},

	prepareStyles(){
		let offsetTop = this.getThemeStyles('view').offsetTop || 0;
		return copy({
			outer: {
				position: "relative",
				top: 0, bottom: 0, left: 0, right: 0,
				width: "100%", height: "100%"
			},
			viewframe: {
				position: "relative",
				top: 0, left: 0, right: 0, bottom: 0,
				width: "100%",
				overflowX: 'hidden',
				overflowY: "scroll",
				minHeight: global.innerHeight,
				WebkitOverflowScrolling: "touch"
			},
			container: {
				overflowX: 'hidden',
				overflowY: "scroll",
				paddingTop: (this.props.style || {paddingTop: 0}).paddingTop,
				marginTop: this.props.navbarOffset + offsetTop,
				minHeight: (global.innerHeight - this.props.navbarOffset) - offsetTop
			},
			content: {}
		});
	}
});

export default View;
