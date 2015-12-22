import React
	from 'react';
import Reflux
	from 'reflux';
import Router
	from 'react-router';
import {Grid}
	from 'react-bootstrap';
import actions
	from '../actions';
import View
	from 'mkapp/lib/View';

/**
* @name AppView
* @desc A view wrapper that can enforce certain behaviors for full screen views
*
* @param {string} title - Required
* @param {string|boolean} backButtonLink- set the url for the nav bar's back button,
* setting as true will create a link that calls history.go(-1), setting as a url
* will set the back arrow link to that url, and setting as false or leaving undefined
* will not render the back button at all
*/
const AppView = React.createClass({

	propTypes: {
		//title: React.PropTypes.string.isRequired,
		title: React.PropTypes.string,
		backButtonLink: React.PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.bool
		])
	},

	contextTypes:{
		navbarHeight: React.PropTypes.number
	},

	getDefaultProps(){
		return {
			backButtonLink: false
		};
	},

	componentDidMount(){
		actions.DID_NAVIGATE({
			viewTitle: this.props.title || "",
			backButtonLink: (this.props.backButtonLink || false)
		});
		actions.SET_NAVBAR_COLOR(this.props.navbarColor);
	},

	render(){
		return (
			<View {...this.props}/>
		);
	}
});

export default AppView;
