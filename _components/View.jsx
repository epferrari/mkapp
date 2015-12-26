import React
	from 'react';
import {Grid}
	from 'react-bootstrap';
import {merge,pick}
  from 'lodash';
import MkappThemeMixin
	from '../theme/mixin';

function copy(object){
	return merge({},object);
}


/**
* @name View
* @desc A view wrapper that can enforce certain behaviors for full screen views
* component mounts. Also provides a Bootstrap Grid for children to render into.
*
* @param {function|array} fixed - element or elements to render outside the Grid component.
* 	Good for drawers, modals, and fixed position elements like footers
*/
const View = React.createClass({
	mixins:[MkappThemeMixin],

	propTypes:{
		fixed: React.PropTypes.oneOfType([
			React.PropTypes.element,
			React.PropTypes.arrayOf(React.PropTypes.element)
		])
	},

	render(){
		let styles = this.prepareStyles();
		return (
			<div style={merge({},styles.viewframe,styles.grid)} ref="view">
				<Grid style={merge({},styles.grid,this.props.style,styles.content)}>
					{this.props.children}
				</Grid>
				{this.props.fixed}
			</div>
		);
	},

	prepareStyles(){
		let _styles = this.getStyles();
		let themeStyles_view = pick(this.getThemeStyles('view'),'marginTop','minHeight');
		_styles.viewframe = merge({},_styles.viewframe,themeStyles_view);
		_styles.grid = merge({},_styles.grid,{minHeight: themeStyles_view.minHeight});
		return _styles;
	},

	getStyles(){
		return copy({
			viewframe: {
				position: "absolute",
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				width: "100%",
				marginTop: 40,
				minHeight: (global.screen.height - 40)
			},
			grid: {
				overflowX: 'hidden',
				overflowY: "scroll"
			},
			content: {
				WebkitOverflowScrolling: "touch"
			}
		});
	}
});

export default View;
