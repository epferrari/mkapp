import React
	from 'react';

import {merge}
	from 'lodash';

/**
* @desc ensure click handler on iOS by wrapping components in a dummy div with a cursor: pointer style
*/
var Trigger = React.createClass({
	getDefaultProps(){
		return {touchEnabled: false};
	},
	getStyles(){
		return {
			backgroundColor: "transparent",
			border: "none",
			outline: "none",
			display:"inline-block",
			cursor:"pointer"
		};
	},

	render(){

		let props = merge({},this.props);
		if(props.onClick && !!props.touchEnabled){
			delete props.onClick;
			props.onTouchEnd = this.props.onClick;
		}

		return (
			<div {...props} className="clear-button" style={merge({},this.props.style,this.getStyles())}>
				{this.props.children}
			</div>
		);
	}
});

export default Trigger;
