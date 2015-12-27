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
	render(){
		return (<div {...this.props} style={merge({},this.getStyles(),this.props.style)}/>);
	}
});

module.exports = Row;
