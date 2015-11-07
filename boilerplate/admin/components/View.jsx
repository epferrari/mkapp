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


var styles = {
	viewbox: {
		width:"100%",
		minHeight: (global.screen.height - 30),
		overflowY:"scroll",
		zIndex:0,
		WebkitOverflowScrolling: "touch",
		//background: 'url(./assets/img/main-BG-hexagons.png)',
		backgroundSize: '100% auto',
		backgroundRepeat: 'repeat'
	}
};

/**
* @name View
* @desc A view wrapper that can enforce certain behaviors for full screen views
* For now, it implements a required title property that is emitted out when the
* component mounts. Also provides a Bootstrap Grid for children to render into.
*
* @param {string} title - Required
* @param {string|boolean} backButtonLink- set the url for the nav bar's back button,
* setting as true will create a link that calls history.go(-1), setting as a url
* will set the back arrow link to that url, and setting as false or leaving undefined
* will not render the back button at all
*/
const View = React.createClass({
	mixins: [Reflux.ListenerMixin],
	propTypes: {
		title: React.PropTypes.string.isRequired,
		backButtonLink: React.PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.bool
		])
	},
	getDefaultProps(){
		return {backButtonLink: false};
	},
	componentDidMount(){
		actions.DID_NAVIGATE({
			viewTitle: this.props.title,
			backButtonLink: (this.props.backButtonLink || false)
		});
		actions.SET_NAVBAR_COLOR(this.props.navbarColor);
		if(this.props.hideNavbarTitle){
			actions.HIDE_NAVBAR_TITLE();
		} else {
			actions.SHOW_NAVBAR_TITLE();
		}
	},
	render(){
		return (
			<div style={styles.viewbox} ref="view">
				<Grid key={0}>
					{this.props.children}
				</Grid>
			</div>
		);
	}
});

export default View;
