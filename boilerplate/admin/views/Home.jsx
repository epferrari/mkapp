import React from 'react';
import View from '../components/View.jsx';
import getLorem from '../../utils/generateLorem.js';
import actions from '../condux/actions.js';

var ActionTrigger = React.createClass({
	getInitialState(){
		return {message:''};
	},
	handleClick(){
		if(this.props.action){
			this.props.action(this.props.payload)
			.bind(this)
			.then(() => this.setState({message:this.props.message}) )
			.catch((err) => this.setState({message:'An error occurred: ' + err}) )
			.delay(6000)
			.finally(() => this.setState({message: ''}) )
		}
	},
	render(){
		return(
			<div style={{padding:10}}><button onClick={this.handleClick}>Trigger Action</button> {this.state.message}</div>
		);
	}
});

var Home = React.createClass({
	render(){
		return (
			<View title="Admin Demo" navbarColor="rgb(0,0,0)" hideNavbarTitle={false}>
				<label>Action A</label>
					<ActionTrigger
						action={actions.actionA}
						message="Triggered Action A"/>

				<label>Action B</label>
					<ActionTrigger
						action={actions.actionB}
						message="Triggered Action B"
						payload="eggs"/>

				<label>Action C</label>
					<ActionTrigger
						action={actions.actionC}
						message="Triggered Action C"
						payload="eggs"/>

				<label>Action D</label>
					<ActionTrigger
						action={actions.actionD}
						message="Triggered Action D"
						payload="eggs"/>
			</View>
		);
	}
});

export default Home;
