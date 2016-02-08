import React from 'react';
import Row from 'mkapp/lib/gridsystem/Row';
import Col from 'mkapp/lib/gridsystem/Column';
import View from '../components/View.jsx';
import {chain} from 'lodash';

import {ReactConnectMixin} from 'condux-client';
import conduxActions from '../../../condux/admin/actions.js';
import demoHz from '../../../condux/admin/frequencies/demo.js';

var ActionTrigger = React.createClass({
	handleClick(){
		if(this.props.action) this.props.action(this.props.payload)
	},
	render(){
		return(
			<div style={{padding:10}}><button onClick={this.handleClick}>Trigger Action</button></div>
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
					<Col width={12}>
						<label>Action A</label>
							<ActionTrigger
								action={conduxActions.ACTION_A}
								payload="A"/>

						<label>Action B</label>
							<ActionTrigger
								action={conduxActions.ACTION_B}
								payload="B"/>

						<label>Action C</label>
							<ActionTrigger
								action={conduxActions.ACTION_C}
								payload="C"/>

						<label>Action D</label>
							<ActionTrigger
								action={conduxActions.ACTION_D}
								payload="D"/>
					</Col>
				</Row>
				<hr/>
				<Row>
					<Col width={12}>
						<h2>Log (last 15)</h2>
						{this.renderLog()}
					</Col>
				</Row>
			</View>
		);
	}
});

export default Home;
