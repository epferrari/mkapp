import React from 'react';
import {merge} from 'lodash';


var styles = {
	color: 'inherit',
	fontSize: 'inherit',
	fontWeight: 'inherit',
	display: 'inline-block'
};

const MuiIcon = React.createClass({
	render(){
		return (
			<i style={merge({},styles,this.props.style)} className={"mui-font-icon mui-" + this.props.icon}/>
		);
	}
});

export default MuiIcon;
