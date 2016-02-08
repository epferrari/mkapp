import React
	from 'react';
import Reflux
	from 'reflux';
import Router
	from 'react-router';
import actions
	from '../actions';
import View
	from 'mkapp/lib/hybrid/View';

/**
* @name AppView
* @desc A view wrapper that can enforce certain behaviors for full screen views
*
* @param {string} title
*/
const AppView = React.createClass({

	propTypes: {
		//title: React.PropTypes.string.isRequired,
		title: React.PropTypes.string
	},

	componentDidMount(){
		actions.DID_NAVIGATE({
			viewTitle: this.props.title || ""
		});
		actions.SET_NAVBAR_COLOR(this.props.navbarColor);
	},

	render(){
		return (
			<View style={{paddingTop:0}} {...this.props}/>
		);
	}
});

export default AppView;
