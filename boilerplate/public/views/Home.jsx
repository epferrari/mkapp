import React from 'react';
import View from '../components/View.jsx';
import getLorem from '../../utils/generateLorem.js';
import actions from '../actions';

var Home = React.createClass({
	render(){
		return (
			<View title="Boilerplate" navbarColor="rgb(0,0,0)" hideNavbarTitle={false}>
				<button onClick={actions.TOGGLE_NAVBAR_TYPE}>Toggle Menu</button>
				<div dangerouslySetInnerHTML={{__html:getLorem(2)}}/>
			</View>
		);
	}
});

export default Home;
