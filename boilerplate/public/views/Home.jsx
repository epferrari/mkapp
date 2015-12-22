import React from 'react';
import View from '../components/AppView.jsx';
import actions from '../actions';
import DrawerLeft from 'mkapp/lib/DrawerLeft';
import DrawerRight from 'mkapp/lib/DrawerRight';
import DrawerTop from 'mkapp/lib/DrawerTop';
import DrawerBottom from 'mkapp/lib/DrawerBottom';
import Curtain from 'mkapp/lib/Curtain';
import {FlatButton} from 'material-ui';


var buttonStyle = {
	display: "block",
	marginLeft: "auto",
	marginRight: "auto",
	padding: 3
};

var innerButtonStyle = {
	display: "block",
	marginLeft: "auto",
	marginRight: "auto",
	padding: 3,
	marginTop: 100
}

var Home = React.createClass({

	getInitialState(){
		return {
			drawerLeftOpen: false,
			drawerRightOpen: false,
			drawerTopOpen: false,
			drawerBottomOpen: false,
			curtainOpen: false
		}
	},

	toggle(dir){
		let newState = {
			drawerLeftOpen: false,
			drawerRightOpen: false,
			drawerTopOpen: false,
			drawerBottomOpen: false,
			drawerCurtainOpen: false
		};
		dir = dir.split("");
		dir[0] = dir[0].toUpperCase();
		dir = dir.join("");
		newState['drawer' + dir + "Open"] = !this.state['drawer' + dir + "Open"];
		this.setState(newState);
	},

	render(){
		return (
			<View title="Boilerplate" hideNavbarTitle={false}>
					<FlatButton style={buttonStyle} onClick={actions.TOGGLE_NAVBAR_TYPE}>Toggle Menu</FlatButton>
				<br/>
				<FlatButton style={buttonStyle} onClick={() => this.toggle('left')}>Left Drawer</FlatButton>
				<br/>
				<FlatButton style={buttonStyle} onClick={() => this.toggle('right')}>Right Drawer</FlatButton>
				<br/>
				<FlatButton style={buttonStyle} onClick={() => this.toggle('top')}>Top Drawer</FlatButton>
				<br/>
				<FlatButton style={buttonStyle} onClick={() => this.toggle('bottom')}>Bottom Drawer</FlatButton>
				<br/>
				<FlatButton style={buttonStyle} onClick={() => this.toggle('curtain')}>Curtain</FlatButton>

				<DrawerLeft open={this.state.drawerLeftOpen}>
					<FlatButton style={innerButtonStyle} onClick={() => this.toggle('left')}>Close Drawer</FlatButton>
				</DrawerLeft>
				<DrawerRight open={this.state.drawerRightOpen}>
					<FlatButton style={innerButtonStyle} onClick={() => this.toggle('right')}>Close Drawer</FlatButton>
				</DrawerRight>
				<DrawerTop open={this.state.drawerTopOpen}>
					<FlatButton style={innerButtonStyle} onClick={() => this.toggle('top')}>Close Drawer</FlatButton>
				</DrawerTop>
				<DrawerBottom open={this.state.drawerBottomOpen}>
					<FlatButton style={innerButtonStyle} onClick={() => this.toggle('bottom')}>Close Drawer</FlatButton>
				</DrawerBottom>
				<Curtain open={this.state.drawerCurtainOpen}>
					<FlatButton style={innerButtonStyle} onClick={() => this.toggle('curtain')}>Close Curtain</FlatButton>
				</Curtain>

			</View>
		);
	}
});

export default Home;
