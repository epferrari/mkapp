import React from 'react';
import {Row,Col} from 'react-bootstrap';
import View from '../components/View.jsx';

import {ReactConnectMixin} from 'condux-client';
import conduxActions from '../../condux/admin/actions.js';
import demoHz from '../../condux/admin/frequencies/demo.js';
import {chain} from 'lodash';

var ActionTrigger = React.createClass({
	handleClick(){
		if(this.props.action) this.props.action(this.props.payload);
	},
	render(){
		return(
			<div style={{padding:10}}>
				<button onClick={this.handleClick}>Trigger Action</button>
			</div>
		);
	}
});

var Home = React.createClass({
	mixins:[ReactConnectMixin],

	componentDidMount(){
		this.tuneInto(demoHz,{
			connection(data){
				this.setState({
					log: data
				});
			},
			message(entry){
				this.setState( ({log}) => {
					log.push(entry);
					return {log: log};
				});
			}
		});
	},

	getInitialState(){
		return {log: []};
	},

	renderLog(){
		return chain(this.state.log)
			.map( (line,i) => <p key={i}>{line}</p> )
			.reverse()
			.value()
			.slice(0,15);
	},

	render(){
		return (
			<View title="Admin Boilerplate" navbarColor="rgb(0,0,0)" hideNavbarTitle={false}>
				<Row>
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
				</Row>
				<hr/>
				<Row>
					<Col xs={12}>
						<h2>Log (15 most recent)</h2>
						{this.renderLog()}
					</Col>
				</Row>
			</View>
		);
	}
});

export default Home;
