/* core stuff
/*************************************************/
import React from "react";
import ReactDOM from 'react-dom';
import Reflux from 'reflux';
import Promise from 'bluebird';

/* ensure Promise implementation for Velocity animate on Android*/
global.Promise = Promise;

/* utilities
/*************************************************/
import {merge} from 'lodash';
require('react-tap-event-plugin')();

/* Routes and Navigation
/**************************************************/
import Router,{Route,History,IndexRoute} from 'react-router';

import ThemeProvider from 'mkapp/lib/ThemeProvider';
import HybridNav from 'mkapp/lib/hybrid/AppNav';
import NavBar from 'mkapp/lib/ios/NavBar';
import NavMenu from 'mkapp/lib/NavMenu';
const menuItems = [
	{title:"Home",path:"/"},
	{title:"View 1",path:"/view1"},
	{title:"View 2",path:"/view2"},
	{title:"View 3",path:"/view3"},
	{title:"Custom Action",onSelection: function(){ console.log('selected custom route!'); } }
];


/* state
/**************************************************/
import AppStateStore from './datastores/AppState.js';

import MkappTheme from 'mkapp/theme';
var getComponentStyles = function(palette,typekit,themeOptions){
	return {
		view:{
			bgColor: "rgb(235, 213, 162)"
		},
		navBar: {
			bgColor: themeOptions.preferMaterial ? "rgb(231, 70, 60)" : "rgb(101, 188, 207)"
		}
	};
}
var mkappTheme = new MkappTheme(null,null,getComponentStyles);

/* Components
/**************************************************/
const App = React.createClass({
	mixins: [Reflux.ListenerMixin],
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
			<ThemeProvider mkappTheme={mkappTheme}>
				<HybridNav
					{...this.state}
					title={this.state.viewTitle}
					connectionStatus={this.state.wsConnection}
					isLoading={this.state.inLoadingState}
					menuItems={menuItems}/>
					{this.props.children}
			</ThemeProvider>
		);
	}
});


ReactDOM.render((
	<Router >
		<Route path="/" component={App}>
			<IndexRoute component={ require('./views/Home.jsx') }/>
			<Route path="/view1" component={ require('./views/View1.jsx') }/>
			<Route path="/view2" component={ require('./views/View2.jsx') }/>
			<Route path="/view3" component={ require('./views/View3.jsx') }/>
		</Route>
	</Router>
),document.getElementById('app'));


export default App;
