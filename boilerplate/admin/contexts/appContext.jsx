import Context from '@epferrari/react-context-utility';
import mui from 'material-ui';
import Promise from 'bluebird';
import {merge} from 'lodash';


/* Material UI Theme stuffs
/*****************************/


var customPalette = {
	primary1Color: "#ffcc00",
	primary2Color: "rgb(233, 230, 201)",
	primary3Color:"#747C76"
};

var customComponentThemes = {};

var customTheme,
		muiTheme,
		{ThemeManager,DarkRawTheme} = mui.Styles;

muiTheme = ThemeManager.getMuiTheme(DarkRawTheme);
customTheme = ThemeManager.modifyRawThemePalette(muiTheme,customPalette);
customTheme = merge({},customTheme,customComponentThemes);






/* Cordova stuffs
/*****************************/


var cordovaIsReady = false;
var cordovaDidLoad = new Promise((resolve) => {
	if(window._cordovaIsReady){
		cordovaIsReady = true;
		delete window._cordovaIsReady;
		resolve();
	}else{
		document.addEventListener("deviceready",() => {
			cordovaIsReady = true;
			resolve();
		});
	}
});

var cordovaEnv = {
	get expected(){
		return global.isCordovaApp;
	},
	get ready(){
		return cordovaIsReady;
	},
	get didLoad(){
		return cordovaDidLoad;
	},
	get platformId(){
		if(cordovaIsReady) return global.cordova.platformId;
	}
};





/* Create the Context
/*****************************/

const appContext = new Context({
	muiTheme: [customTheme,"object"],
	cordovaEnv: [cordovaEnv,"object"]
});


/*****************************/



export default appContext;
