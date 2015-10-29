import React
	from 'react';

import {map,merge,contains}
	from 'lodash';

import Reflux
	from 'reflux';

import {Navigation,Link}
	from 'react-router';

import {Row,Col}
	from 'react-bootstrap';

import FontIcon
	from 'react-fa-icon';

import Overlay
	from './Overlay.jsx';

import NavMenuItem
	from './NavMenuItem.jsx';

import MuiIcon
	from './MuiIcon.jsx';

import Velocity
	from 'velocity-animate';

import Trigger
	from '../components/Trigger.jsx';



/*************************************/



var AppNav = React.createClass({

	mixins: [Navigation],

	propTypes:{
		viewTitle: React.PropTypes.string,
		backButtonLink: React.PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.bool
		]),
		isLoading: React.PropTypes.bool,
		connectionStatus: React.PropTypes.number,
		navbarColor: React.PropTypes.string,
		showNavbarTitle: React.PropTypes.bool
	},

	getDefaultProps(){
		return {
			menuItems: [],
			navbarColor: 'rgb(0,0,0)',
			hideNavbarTitle: false
		};
	},

	getInitialState(){
		return {
			menuActive: false
		};
	},

	showMenu(){
		if(!this.state.menuActive){
			this.setState({
				menuActive: true,
				menuAnimating: true
			});
		}
	},

	hideMenu(){
		this.setState({
			menuActive: false,
			menuAnimating: true
		});
	},

	closeAndRoute(nextRoute){
		this.setState({
			nextRoute: nextRoute,
			menuActive: false,
			menuAnimating: true
		});
	},

	menuDidLeave(){
		let nextRoute = this.state.nextRoute;
		this.setState({
			menuAnimating:false,
			nextRoute: null
		});
		if(nextRoute) this.transitionTo(nextRoute);
	},

	handleNavBack(){
		let {backButtonLink} = this.props;
		if(backButtonLink === true){
			global.history.go(-1);
			//this.goBack();
		}else if(backButtonLink){
			this.transitionTo(backButtonLink);
		}
	},

	renderStatusBar(){
		let statusBar = null;
		let status = this.props.connectionStatus;
		let styles = this.getStyles();
		if(status === 0){
			statusBar = (
				<Row style={styles.statusBar}>
					<span style={{display:"table-cell"}}>Not Connected <MuiIcon icon="warning"/></span>
				</Row>
			);
		} else if(status === 1){
			statusBar = (
				<Row style={styles.statusBar}>
					<span style={{display:"table-cell"}}>Connecting <FontIcon icon="spinner" spin/></span>
				</Row>
			);
		} else{
			return null;
		}
		return statusBar;
	},


	renderBackButton(styles){
		if(this.props.backButtonLink){
			return (
				<Col xs={2} >
					<div
						style={styles.backButtonWrapper}
						onClick={this.handleNavBack}>
							<MuiIcon icon="arrow-back" />
					</div>
				</Col>
			);
		}else{
			return <Col xs={2}/>;
		}
	},

	renderLoadingState(){
		return (
			<Col xs={1} style={{padding:0,paddingTop:4}}>
				{this.props.isLoading && <FontIcon icon="spinner" spin/>}
			</Col>
		);
	},

	renderTitle(styles){
		return (
			<Col xs={6}>
				<div style={styles.title}>{this.props.showNavbarTitle && this.props.viewTitle}</div>
			</Col>
		);
	},

	renderOpenButton(styles){
		return (
			<Col xs={3}
				onClick={this.showMenu}
				style={{paddingRight:8}}>
				<button style={styles.menuOpenButton} >Menu <FontIcon icon="bars"/></button>
			</Col>
		);
	},

	renderNavItems(){
		return map(this.props.menuItems, (route,idx) => {
			return (
				<NavMenuItem
					key={idx}
					shouldAnimate={this.state.menuActive}
					animDelay={idx * 50}
					name={route.menuLabel || route.title}
					path={route.testPath || route.path}
					onSelection={this.closeAndRoute}/>
			);
		});
	},

	render(){
		let styles = this.getStyles();

		let rootStyle = merge({},styles.nav);
		// root style, render with full screen height or collapsed navbar height?
		if(this.state.menuActive || this.state.menuAnimating) merge(rootStyle,styles.navActive);

		let barStyle = merge({},styles.bar);
		// should render extra hight for status bar?
		if(contains([0,1],this.props.connectionStatus)) merge(barStyle,styles.barWithStatus);

		return (
			<div style={rootStyle}>
				<Row style={barStyle}>

					{this.renderBackButton(styles)}
					{this.renderLoadingState(styles)}
					{this.renderTitle(styles)}
					{this.renderOpenButton(styles)}
					{this.renderStatusBar(styles)}

					<Overlay open={this.state.menuActive} onExit={this.menuDidLeave}>
						<div style={styles.overlayInner}>
							<Trigger onClick={this.hideMenu} style={styles.topCloseButton}>
								<MuiIcon style={{fontSize:21,verticalAlign:"middle"}} icon="clear"/>
							</Trigger>
							<div style={styles.menuItemList}>
								{this.renderNavItems()}
							</div>
							<button
								ref="closeButton"
								onClick={this.hideMenu}
								style={merge({},styles.bottomCloseButton,styles.componentWillEnter)}>
									<span style={{verticalAlign:"middle"}}>CLOSE </span>
									<MuiIcon style={{fontSize:21,verticalAlign:"middle"}} icon="clear"/>
							</button>
						</div>
					</Overlay>

				</Row>
			</div>
		);
	},

	componentDidUpdate(){
		let styles = this.getStyles();
		let closeButton = React.findDOMNode(this.refs.closeButton);
		if(this.state.menuActive){
			Velocity(closeButton,styles.componentDidEnter,{delay:450});
		}else{
			Velocity(closeButton,styles.componentWillEnter,{duration:200});
		}
	},

	getStyles(){
		return {
			/**
			* animation states for velocity-animate
			*/
			componentWillEnter:{
				opacity: 0,
				marginLeft: -5,
				marginTop: -5
			},
			componentDidEnter: {
				opacity: 1,
				marginLeft: 0,
				marginTop:0
			},
			nav: {
				position:"fixed",
				top:0,
				left:0,
				right:0,
				zIndex: 1,
				WebkitOverflowScrolling: "touch"
			},
			navActive:{
				bottom:0,
				height:"100%",
				minHeight:"100%",
				maxHeight:"100%"
			},
			title:{
				paddingTop:4,
				textAlign:"center",
				width:"100%"
			},
			bar: {
				backgroundColor: this.props.navbarColor,
				verticalAlign: 'middle',
				//paddingTop: 8,
				minHeight: 30,
				height: 30,
				maxHeight: 30,
				fontSize: 14,
				textTransform:"uppercase",
				color:"#fff",
				fontWeight: 200,
				marginLeft: 0,
				marginRight: 0
			},
			barWithStatus:{
				height: 36,
				maxHeight: 36
			},
			statusBar:{
				fontSize: 10,
				height: 6,
				maxHeight: 6,
				textTransform: "none",
				textAlign: "center",
				color: "#fff",
				backgroundColor: this.props.navbarColor,
				display: "table",
				width: "100%",
				verticalAlign: "middle"
			},
			menuOpenButton:{
				margin:0,
				padding:0,
				paddingTop:4,
				border:"none",
				background:"none",
				float:"right",
				paddingBottom:8
			},
			menuRight: {
				float: "right"
			},
			overlayInner:{
				position:"relative",
				paddingTop:16,
				paddingBottom:166,
				minHeight:global.innerHeight
			},
			topCloseButton:{
				//color: "rgb(255,205,17)",
				color: "rgb(255,255,255)",
				fontSize:16,
				textDecoration:"none",
				fontWeight: 200,
				position: "absolute",
				top: 10,
				left: 10
			},
			bottomCloseButton: {
				color: "rgb(255,205,17)",
				fontSize:16,
				textDecoration:"none",
				fontWeight: 200,
				float: "right",
				margin: 0,
				padding:0,
				border:"none",
				background: "none",
				cursor: "pointer",
				/* this doesn't work for smaller screens */
				position: "absolute",
				bottom: 22,
				right: 12
			},

			backButtonWrapper:{
				width:40,
				cursor:"pointer",
				fontSize: 20,
				fontWeight: 100,
				paddingTop:4,
				marginLeft:-10,
				marginTop: -4
			},
			navMenuList:{
				display: "block",
				width: "100%",
				textTransform: "uppercase",
				textAlign: "right",
				paddingRight: 3,
				paddingTop: 20
			}
		};
	}
});


export default AppNav;
