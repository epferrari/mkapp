import React from 'react';
import View from '../components/AppView.jsx';

var View1 = React.createClass({

	render(){
		return (
			<View title="View 1">
				<h2>Another View</h2>
			</View>
		);
	}
});

module.exports = View1;
