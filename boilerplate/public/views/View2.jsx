import React from 'react';
import View from '../components/AppView.jsx';

var View2 = React.createClass({

	render(){
		return (
			<View title="View 2">
				<h2>Another View</h2>
			</View>
		);
	}
});

module.exports = View2;
