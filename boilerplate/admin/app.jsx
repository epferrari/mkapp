/* core stuff
/*************************************************/
import React
	from "react";

import ReactDOM from 'react-dom';

import Reflux
	from 'reflux';

import Promise
	from 'bluebird';

/* ensure Promise implementation for Velocity animate on Android*/
global.Promise = Promise;


/* try like hell to get something to work for fast touch events
/*************************************************/
//require('react-fastclick');
require('react-tap-event-plugin')();
//React.initializeTouchEvents(true);


/* utilities
/*************************************************/
import {merge}
	from 'lodash';

//import './lib/google-analytics.js';



/* Routes and Navigation
/**************************************************/
import Router,{Route,History,IndexRoute}
	from 'react-router';

import AppNav from 'mkapp/lib/material/AppNav';


/* contexts & state
/**************************************************/
import AppContext
	from './contexts/appContext.jsx';

import AppStateStore
	from './datastores/AppState.js';


/* Components
/**************************************************/


/* container for credentialed application views */
const App = React.createClass({
	mixins: [AppContext.Mixin,Reflux.ListenerMixin],
	childContextTypes: {
		modalContainer: React.PropTypes.object
	},

	getChildContext(){
		return {
			// for bootstrap modals deep in app
			modalContainer: this
		};
	},

	getInitialState(){
		return AppStateStore.getState();
	},

	componentDidMount(){
		this.listenTo(AppStateStore,s => this.setState(s));
	},

	render(){
		return (
			<div >
				<AppNav
					{...this.state}
					title={this.state.viewTitle}
					showLoading={this.state.inLoadingState}
					style={{backgroundColor: this.state.navbarColor}}/>
					{this.props.children}
			</div>
		);
	}
});

import Home from './views/Home.jsx';

ReactDOM.render((
	<Router >
		<Route path="/" component={App}>
			<IndexRoute component={Home}/>
		</Route>
	</Router>
),document.getElementById('app'));


export default App;
