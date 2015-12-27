import React from 'react';
import {merge} from 'lodash';

var Column = React.createClass({
	getStyles(){
		let w = this.props.width;
		w = Number.isInteger(w) ? w : 12;
		return {
			width: w * 100 / 12 + '%',
			display: 'block',
			paddingLeft:15,
			paddingRight:15,
			minHeight:1,
			position:'relative',
			float:'left',
			boxSizing: 'border-box'
		};
	},
	render(){
		return (<div {...this.props} style={merge({},this.getStyles(),this.props.style)}/>);
	}
});

module.exports = Column;
