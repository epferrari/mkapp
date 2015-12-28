import React from 'react';
import View from '../components/AppView.jsx';
import actions from '../actions';
import DrawerLeft from 'mkapp/lib/DrawerLeft';
import DrawerRight from 'mkapp/lib/DrawerRight';
import DrawerTop from 'mkapp/lib/DrawerTop';
import DrawerBottom from 'mkapp/lib/DrawerBottom';
import Curtain from 'mkapp/lib/Curtain';
import {FlatButton} from 'material-ui';
import Touchable from 'mkapp/lib/Touchable';


var FlatTouchButton = React.createClass({
	render(){
		return <Touchable component={FlatButton} {...this.props}/>;
	}
});

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
	marginTop: 50
}

var Home = React.createClass({

	getInitialState(){
		return {
			openDrawer: null
		}
	},

	contextTypes:{
		mkappTheme: React.PropTypes.object
	},

	open(id){
		if(id === this.state.openDrawer){
			this.setState({openDrawer: null});
		}else{
			this.setState({openDrawer: id});
		}
	},

	renderStatic(){
		return [
			<DrawerLeft
				key={0}
				open={this.state.openDrawer === 0}
				onExit={() => {if(this.state.openDrawer === 0) this.setState({openDrawer: null});}}>
			</DrawerLeft>,

			<DrawerRight
				key={1}
				open={this.state.openDrawer === 1}
				onExit={() => {if(this.state.openDrawer === 1) this.setState({openDrawer: null});}}>
			</DrawerRight>,

			<DrawerTop
				key={2}
				open={this.state.openDrawer === 2}
				onExit={() => {if(this.state.openDrawer === 2) this.setState({openDrawer: null});}}>
				<FlatTouchButton
					style={innerButtonStyle}
					onClick={() => this.open(2)}>Close Drawer</FlatTouchButton>
			</DrawerTop>,

			<DrawerBottom
				key={3}
				open={this.state.openDrawer === 3}
				onExit={() => {if(this.state.openDrawer === 3) this.setState({openDrawer: null});}}>
				<FlatTouchButton
					style={innerButtonStyle}
					onClick={() => this.open(3)}>Close Drawer</FlatTouchButton>
			</DrawerBottom>,

			<Curtain
				key={4}
				open={this.state.openDrawer === 4}
				onExit={() => {if(this.state.openDrawer === 4) this.setState({openDrawer: null});}}>
				<FlatTouchButton
					style={innerButtonStyle}
					onClick={() => this.open(4)}>Close Curtain</FlatTouchButton>
			</Curtain>
		];
	},
	render(){
		return (
			<View title="Mkapp" navbarColor="transparent" static={this.renderStatic()} style={{backgroundColor:"rgb(101, 188, 207)"}}>
				<FlatTouchButton
					style={buttonStyle}
					onClick={() => {
						this.context.mkappTheme.preferMaterial = !this.context.mkappTheme.preferMaterial;
					}
					}>Toggle Menu</FlatTouchButton>
				<br/>
				<FlatTouchButton
					style={buttonStyle}
					onClick={() => this.open(0)} >Left Drawer</FlatTouchButton>
				<br/>
				<FlatTouchButton
					style={buttonStyle}
					onClick={() => this.open(1)} >Right Drawer</FlatTouchButton>
				<br/>
				<FlatTouchButton
					style={buttonStyle}
					onClick={() => this.open(2)} >Top Drawer</FlatTouchButton>
				<br/>
				<FlatTouchButton
					style={buttonStyle}
					onClick={() => this.open(3)} >Bottom Drawer</FlatTouchButton>
				<br/>
				<FlatTouchButton
					style={buttonStyle}
					onClick={() => this.open(4)}>Curtain</FlatTouchButton>
			</View>
		);
	}
});

module.exports = Home;
