import React
	from 'react';
import ReactDOM
	from 'react-dom';
import {map,merge,contains,pick}
	from 'lodash';
import {History,Link}
	from 'react-router';
import Velocity
	from 'velocity-animate';
import FontIcon
	from '@epferrari/react-fa-icon';
import typeOf
	from '@epferrari/js-utils/lib/typeOf';
import Overlay
	from './Overlay';
import NavMenuItem
	from './NavMenuItem';
import MuiIcon
	from './MuiIcon';
import Trigger
	from './Trigger';
import MkappThemeMixin
	from '../theme/mixin';
import MkappThemeStyleMerger
	from '../theme/utils/styleMerger';

/*************************************/
/* helpers */

var Row = React.createClass({
	getStyles(){
		return {
			width:'100%',
			display:'block',
			marginLeft:0,
			marginRight:0,
			paddingLeft:0,
			paddingRight:0,
			boxSizing: 'border-box'
		};
	},
	render(){
		return (<div {...this.props} style={merge({},this.getStyles(),this.props.style)}/>);
	}
});

var Col = React.createClass({
	getStyles(){
		let w = this.props.xs;
		w = (w && typeOf(w) === 'number') ? w : 12;
		return {
			width: w * 100 / 12 + '%',
			display: 'block',
			paddingLeft:15,
			paddingRight:15,
			minHeight:1,
			position:'relative',
			float:'left',
			boxSizing: 'border-box'
		};
	},
	render(){
		return (<div {...this.props} style={merge({},this.getStyles(),this.props.style)}/>);
	}
});

/*************************************/



var AppNav = React.createClass({

	mixins: [History,MkappThemeMixin],

	propTypes:{
		title: React.PropTypes.string,
		backButtonLink: React.PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.bool
		]),
		isLoading: React.PropTypes.bool,
		connectionStatus: React.PropTypes.number,
		navbarColor: React.PropTypes.string,
		hideTitle: React.PropTypes.bool,
		menuItems: React.PropTypes.arrayOf(
			React.PropTypes.shape({
				path: React.PropTypes.string.isRequired,
				label: React.PropTypes.string,
				title: React.PropTypes.string
			})
		),
		menuPosition:React.PropTypes.oneOf(['top','left','right','bottom']),
		menuStyle: React.PropTypes.object,
		menuButtonLabel: React.PropTypes.string,
		menuButtonIconElement: React.PropTypes.element,
		materialDesign: React.PropTypes.bool
	},

	getDefaultProps(){
		return {
			menuItems: [],
			navbarColor: undefined,
			hideTitle: false,
			usemkappTheme: true,
			menuPosition: "left",
			menuStyle:{
				width:"70%"
			},
			menuButtonLabel:"",
			menuButtonIconElement: 	(<FontIcon icon="bars"/>),
			materialDesign: false,
			title: ""
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
		if(nextRoute) this.history.pushState(null,nextRoute);
	},

	handleNavBack(){
		let {backButtonLink} = this.props;
		if(backButtonLink === true){
			global.history.go(-1);
		}else if(backButtonLink){
			this.history.pushState(null,backButtonLink);
		}
	},

	renderStatusBar(){
		let statusBar = null;
		let status = this.props.connectionStatus;
		let styles = this.getStyles();
		if(status === 0){
			statusBar = (
				<Row style={styles.navbar_statusBar}>
					<span style={{display:"table-cell"}}>Not Connected <MuiIcon icon="warning"/></span>
				</Row>
			);
		} else if(status === 1){
			statusBar = (
				<Row style={styles.navbar_statusBar}>
					<span style={{display:"table-cell"}}>Connecting <FontIcon icon="spinner" spin/></span>
				</Row>
			);
		} else{
			return null;
		}
		return statusBar;
	},


	renderBackButton(styles){
		if(this.props.backButtonLink && !this.props.materialDesign){
			return (
				<Col xs={2} >
					<div
						style={styles.navbar_backBtn}
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

	trimTitle(){
		if(this.props.title.length > 16){
			return this.props.title.split('').slice(0,16).concat("...").join('');
		} else {
			return this.props.title;
		}
	},

	renderTitleCenter(styles){
		return (
			<Col xs={6}>
				<div style={styles.navbar_titleCenter}>{!this.props.hideTitle && this.trimTitle()}</div>
			</Col>
		);
	},

	renderTitleLeft(styles){
		return (
			<Col xs={8}>
				<div style={styles.navbar_titleLeft}>{!this.props.hideTitle && this.trimTitle()}</div>
			</Col>
		);
	},

	renderMenuButtonRight(styles){
		if(!this.state.menuActive){
			return (
				<Col xs={3}
					onClick={(e) => {
						e.stopPropagation();
						this.showMenu();
					}}
					style={{paddingRight:8}}>
					<button style={styles.navbar_menuOpenBtnRight}>
						{this.props.menuButtonLabel} {this.props.menuButtonIconElement}
					</button>
				</Col>
			);
		} else {
			return <Col xs={3}/>;
		}
	},

	renderMenuButtonLeft(styles){
		if(!this.state.menuActive){
			return (
				<Col xs={1}
					onClick={(e) => {
						e.stopPropagation();
						this.showMenu();
					}}
					style={{paddingRight:8}}>
					<button style={styles.navbar_menuOpenBtnLeft}>
						{this.props.menuButtonLabel} {this.props.menuButtonIconElement}
					</button>
				</Col>
			);
		} else {
			return <Col xs={1}/>;
		}
	},

	renderNavItems(){
		return map(this.props.menuItems, (route,idx) => {
			return (
				<NavMenuItem
					key={idx}
					shouldAnimate={this.state.menuActive}
					animDelay={idx * 50}
					name={route.label || route.title}
					path={route.path}
					onSelection={this.closeAndRoute}/>
			);
		});
	},

	render(){
		let styles = this.getStyles();

		let appNavStyle = merge({},styles.appNav);
		// root style, render with full screen height or collapsed navbar height
		if(this.state.menuActive || this.state.menuAnimating) merge(appNavStyle,styles.appNav_open);

		let navbarStyle = merge({},styles.navbar);
		// render extra height for status bar?
		if(contains([0,1],this.props.connectionStatus)) merge(navbarStyle,styles.navbar_hasStatus);

		let md = this.props.materialDesign;

		return (
			<div style={appNavStyle} onClick={() => this.hideMenu()}>
				<Row style={navbarStyle}>

					{md ? this.renderMenuButtonLeft(styles) : this.renderBackButton(styles)}
					{md ? this.renderTitleLeft(styles) : this.renderLoadingState(styles)}
					{md ? this.renderBackButton(styles) : this.renderTitleCenter(styles)}
					{md ? this.renderLoadingState(styles) : this.renderMenuButtonRight(styles)}
					{this.renderStatusBar(styles)}

					<Overlay
						open={this.state.menuActive}
						onExit={this.menuDidLeave}
						position={this.props.menuPosition}
						style={styles.menu_overlay}>

						<div style={styles.menu_inner}>
							<Trigger ref="closeButton" onClick={this.hideMenu} style={styles.menu_closeBtnTop}>
								<MuiIcon style={{fontSize:21,verticalAlign:"middle"}} icon="clear"/>
							</Trigger>
							<div style={styles.menu_itemList}>
								{this.renderNavItems()}
							</div>
							{this.props.children}
						</div>
					</Overlay>

				</Row>
			</div>
		);
	},

	componentDidUpdate(){
		let styles = this.getBaseStyles();
		let closeButton = this.refs.closeButton;

		if(this.state.menuActive){
			Velocity(closeButton,styles.componentDidEnter,{delay:450});
		}else{
			Velocity(closeButton,styles.componentWillEnter,{duration:200});
		}
	},

	getStyles(){
		var _styles = this.getBaseStyles();
		return merge(_styles,this.getNavbarStyles(_styles),this.getMenuStyles(_styles));
	},

	getNavbarStyles(baseStyles){
		// theme styles
		let themeStyles_navbar = this.getThemeStyles('appNav');
		// props styles, override theme styles
		let propsStyles_navbar = {
			bgColor: this.props.navbarColor,
			textColor: this.props.textColor
		};
		// only use backgroundColor and color from theme and props
		let navbarStyles = pick(MkappThemeStyleMerger(propsStyles_navbar,themeStyles_navbar),'backgroundColor','color');

		// return to be merged into rendered styles
		return {
			navbar: merge({},baseStyles.navbar,navbarStyles),
			navbar_statusBar: merge({},baseStyles.navbar_statusBar,navbarStyles),
		};
	},

	getMenuStyles(baseStyles){
		let themeStyles_menu = this.getThemeStyles('appNavMenu');
		let propsStyles_menu = (this.props.menuStyle || {});

		let mergedMenuStyles = MkappThemeStyleMerger(propsStyles_menu,themeStyles_menu);
		// only use background and width styles from theme and props
		let styleProps = [
			'backgroundColor',
			'backgroundPosition',
			'backgroundRepeat',
			'backgroundSize',
			'width',
			'maxWidth',
			'minWidth'
		];

		let menuStyles = pick(mergedMenuStyles,styleProps);
		let closeBtnStyles = pick(mergedMenuStyles,'color');

		return {
			menu_overlay: merge({},baseStyles.menu_overlay,menuStyles),
			menu_closeBtnTop: merge({},baseStyles.menu__closeBtnTop,closeBtnStyles)
		};
	},

	getBaseStyles(){
		return merge({},{
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
			appNav: {
				position:"fixed",
				top:0,
				left:0,
				right:0,
				zIndex: 1,
				WebkitOverflowScrolling: "touch"
			},
			appNav_open:{
				bottom:0,
				height:"100%",
				minHeight:"100%",
				maxHeight:"100%",
				zIndex:999999999
			},
			navbar:{
				backgroundColor: "rgb(0,0,0)",
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
			navbar_hasStatus:{
				height: 36,
				maxHeight: 36
			},
			navbar_statusBar:{
				fontSize: 10,
				height: 6,
				maxHeight: 6,
				textTransform: "none",
				textAlign: "center",
				color: "#fff",
				backgroundColor: "rgb(0,0,0)",
				display: "table",
				width: "100%",
				verticalAlign: "middle"
			},
			navbar_titleCenter:{
				paddingTop:4,
				textAlign:"center",
				width:"100%"
			},
			navbar_titleLeft:{
				paddingTop:4,
				textAlign:"left",
				width:"100%",
				textTransform:"capitalize"
			},
			navbar_menuOpenBtnLeft:{
				margin:0,
				padding:0,
				paddingTop:4,
				border:"none",
				background:"none",
				float:"left",
				paddingBottom:8
			},
			navbar_menuOpenBtnRight:{
				margin:0,
				padding:0,
				paddingTop:4,
				border:"none",
				background:"none",
				float:"right",
				paddingBottom:8
			},
			navbar_backBtn:{
				width:40,
				cursor:"pointer",
				fontSize: 20,
				fontWeight: 100,
				paddingTop:4,
				marginLeft:-10,
				marginTop: -4
			},
			menu_inner:{
				position:"relative",
				paddingTop:16,
				paddingBottom:166,
				minHeight:global.innerHeight
			},
			menu_closeBtnTop:{
				//color: "rgb(255,205,17)",
				color: "rgb(255,255,255)",
				fontSize:16,
				textDecoration:"none",
				fontWeight: 200,
				position: "absolute",
				top: 8,
				right: 8
			},
			menu_itemList:{
				display: "block",
				width: "100%",
				textTransform: "uppercase",
				textAlign: "right",
				paddingRight: 3,
				paddingTop: 20
			},
			menu_closeBtnBottom: {
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
			}
		});
	}


});


export default AppNav;
