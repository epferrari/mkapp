import React
	from 'react';
import {Grid}
	from 'react-bootstrap';
import {merge}
  from 'lodash';

var styles = {
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
		//zIndex: 1,
		overflowX: 'hidden',
		overflowY: "scroll"
	},
	content: {
		WebkitOverflowScrolling: "touch"
	}
};


/**
* @name View
* @desc A view wrapper that can enforce certain behaviors for full screen views
* component mounts. Also provides a Bootstrap Grid for children to render into.
*
* @param {string} title - Required
*/
const View = React.createClass({
	propTypes:{
		title: React.PropTypes.string
	},

	render(){
		return (
			<div style={merge({},styles.viewframe,styles.grid)} ref="view">
				<Grid style={merge({},styles.grid,this.props.style,styles.content)}>
					{this.props.children}
				</Grid>
				{this.props.static}
			</div>
		);
	}
});

export default View;
