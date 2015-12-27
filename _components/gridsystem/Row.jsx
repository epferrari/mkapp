import React from 'react';
import {merge} from 'lodash';

var Row = React.createClass({
	getStyles(){
		return {
			width:'100%',
			display:'block',
			marginLeft:0,
			marginRight:0,
			paddingLeft:0,
			paddingRight:0,
			boxSizing: 'border-box'
		};
	},
	prepareStyles(){
		return merge({},this.getStyles(),this.props.style);
	},
	render(){
		let props = merge({},this.props);
		let style = props.style;
		delete props.style;
		return (<div {...props} style={this.prepareStyles()}/>);
	}
});

module.exports = Row;
