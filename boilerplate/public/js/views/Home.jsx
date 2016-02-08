import React from 'react';
import View from '../components/AppView.jsx';
import actions from '../actions';
import DrawerLeft from 'mkapp/lib/DrawerLeft';
import DrawerRight from 'mkapp/lib/DrawerRight';
import DrawerTop from 'mkapp/lib/DrawerTop';
import DrawerBottom from 'mkapp/lib/DrawerBottom';
import Curtain from 'mkapp/lib/Curtain';
import NotifyBarTop from 'mkapp/lib/NotifyBarTop';
import NotifyBarBottom from 'mkapp/lib/NotifyBarBottom';
import Touchable from 'mkapp/lib/Touchable';


var TouchButton = React.createClass({
	render(){
		return <Touchable component="div" {...this.props}/>
	}
});

var buttonStyle = {
	display: "block",
	marginLeft: "auto",
	marginRight: "auto",
	padding: 3,
	cursor: "pointer",
	width: '100%',
	backgroundColor: '#fff',
	marginTop: 1,
	minHeight: 30,
	textAlign: 'center',
	float:"left",
	paddingTop: 12
};

var innerButtonStyle = {
	display: "block",
	marginLeft: "auto",
	marginRight: "auto",
	padding: 3,
	marginTop: 10,
	cursor: "pointer",
	minHeight: 20,
	textAlign: 'center'
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

	close(id){
		if(this.state.openDrawer === id) this.setState({openDrawer: null});
	},

	renderStatic(){
		return [
			<DrawerLeft
				key={0}
				open={this.state.openDrawer === 0}
				didExit={() => this.close(0)}>
			</DrawerLeft>,

			<DrawerRight
				key={1}
				open={this.state.openDrawer === 1}
				didExit={() => this.close(1)}>
			</DrawerRight>,

			<DrawerTop
				key={2}
				open={this.state.openDrawer === 2}
				didExit={() => this.close(2)}>
				<TouchButton
					style={innerButtonStyle}
					onClick={() => this.open(2)}>Close Drawer</TouchButton>
			</DrawerTop>,

			<DrawerBottom
				key={3}
				open={this.state.openDrawer === 3}
				didExit={() => this.close(3)}>
				<TouchButton
					style={innerButtonStyle}
					onClick={() => this.open(3)}>Close Drawer</TouchButton>
			</DrawerBottom>,

			<Curtain
				key={4}
				open={this.state.openDrawer === 4}
				didExit={() => this.close(4)}>
				<TouchButton
					style={innerButtonStyle}
					onClick={() => this.open(4)}>Close Curtain</TouchButton>
			</Curtain>,

			<NotifyBarTop
				key={5}
				open={this.state.openDrawer === 5}
				didExit={() => this.close(5)}>
				<TouchButton
					style={innerButtonStyle}
					onClick={() => this.open(5)}>Close NotifyBar</TouchButton>
			</NotifyBarTop>,

			<NotifyBarBottom
				key={6}
				open={this.state.openDrawer === 6}
				didExit={() => this.close(6)}>
				<TouchButton
					style={innerButtonStyle}
					onClick={() => this.open(6)}>Close NotifyBar</TouchButton>
			</NotifyBarBottom>,
		];
	},
	render(){
		return (
			<View title="Mkapp" navbarColor="transparent" static={this.renderStatic()} style={{backgroundColor:"rgb(101, 188, 207)"}}>
				<TouchButton
					style={buttonStyle}
					onClick={() => {
						this.context.mkappTheme.setOptions({preferMaterial: !this.context.mkappTheme.options.preferMaterial });
					}
					}>Toggle Menu</TouchButton>
				<br/>
				<TouchButton
					style={buttonStyle}
					onClick={() => this.open(0)} >Left Drawer</TouchButton>
				<br/>
				<TouchButton
					style={buttonStyle}
					onClick={() => this.open(1)} >Right Drawer</TouchButton>
				<br/>
				<TouchButton
					style={buttonStyle}
					onClick={() => this.open(2)} >Top Drawer</TouchButton>
				<br/>
				<TouchButton
					style={buttonStyle}
					onClick={() => this.open(3)} >Bottom Drawer</TouchButton>
				<br/>
				<TouchButton
					style={buttonStyle}
					onClick={() => this.open(4)}>Curtain</TouchButton>
				<br/>
				<TouchButton
					style={buttonStyle}
					onClick={() => this.open(5)}>Notify Bar Top</TouchButton>
				<br/>
				<TouchButton
					style={buttonStyle}
					onClick={() => this.open(6)}>Notify Bar Bottom</TouchButton>
			</View>
		);
	}
});

module.exports = Home;
