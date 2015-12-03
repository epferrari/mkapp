import React from 'react';
import {Row} from 'react-bootstrap';
import View from '../components/View.jsx';

import {ReactConnectMixin} from 'condux-client';
import conduxActions from '../../condux/admin/actions.js';

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
	mixins:[ReactConnectMixin],

	componentDidMount(){
		this.tuneInto('/demoChannel',{
			connection(data){
				this.setState({
					log: data
				});
			},
			message(entry){
				this.setState( prevState => {
					log: prevState.log.push(entry);
				});
			}
		});
	},

	getInitialState(){
		return {log: []};
	},

	renderLog(){
		return this.state.log.map( line => <p>{line}</p> );
	},

	render(){
		return (
			<View title="Admin Boilerplate" navbarColor="rgb(0,0,0)" hideNavbarTitle={false}>
				<label>Action A</label>
					<ActionTrigger
						action={conduxActions.ACTION_A}
						message="Triggered Action A"
						payload="A"/>

				<label>Action B</label>
					<ActionTrigger
						action={conduxActions.ACTION_B}
						message="Triggered Action B"
						payload="B"/>

				<label>Action C</label>
					<ActionTrigger
						action={conduxActions.ACTION_C}
						message="Triggered Action C"
						payload="C"/>

				<label>Action D</label>
					<ActionTrigger
						action={conduxActions.ACTION_D}
						message="Triggered Action D"
						payload="D"/>

				<Row>{this.renderLog()}</Row>
			</View>
		);
	}
});

export default Home;
