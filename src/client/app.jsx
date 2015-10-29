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

import AppNav
	from './components/AppNav.jsx';




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

	componentDidMount(){
		this.listenTo(AppStateStore,appState => this.setState(appState));
	},

	getInitialState(){
		return AppStateStore.getState();
	},

	getStyles(){
		return {
			viewContainer:{
				marginTop:40,
				zIndex:0,
				position:"relative",
				minHeight: (global.screen.height - 30),
				WebkitOverflowScrolling:"touch"
			}
		};
	},

	render(){
		return (
			<div >
				<AppNav
					{...this.state}
					connectionStatus={this.state.wsConnection}
					isLoading={this.state.inLoadingState}/>
				<div style={this.getStyles().viewContainer} {...this.state}>
					{this.props.children}
				</div>
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

/*
<Route path="about" component={About}/>
<Route path="services" component={Services}/>
<Route path="doctors" component={Doctors}/>
<Route path="facilities" component={Facilities}/>
<Route path="research" component={Research}/>
<Route path="growth" component={Growth}/>
<Route path="contact" component={Contact}/>
<Route path="journal" component={Journal}/>
<Route path="experiences" component={ExperienceDashboard}>
	<Route path="viewer" component={ARviewer}/>
	<Route path="models/:name" component={ModelViewer}/>
</Route>
*/
