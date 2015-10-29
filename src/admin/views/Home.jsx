import React from 'react';
import View from '../components/View.jsx';
import getLorem from '../../utils/generateLorem.js';

var Home = React.createClass({
	render(){
		return (
			<View title="Admin Demo" navbarColor="rgb(0,0,0)" hideNavbarTitle={false}>
				<h1></h1>
				<div dangerouslySetInnerHTML={{__html:getLorem(2)}}/>
			</View>
		);
	}
});

export default Home;
