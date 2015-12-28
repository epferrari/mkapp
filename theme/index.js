var merge = require('lodash').merge;
var pick = require('lodash').pick;
var isEqual = require('lodash').isEqual;
var Colors = require('material-ui/lib/styles/colors');
var typeOf = require('@epferrari/js-utils/lib/typeOf').default;
var EventEmitter = require('events');
var util = require('util');

// default palette
var _palette = {
	primary1Color: Colors.blueGrey500,
	primary2Color: Colors.blueGrey800,
	primary3Color: Colors.blueGrey900,
	accent1Color: Colors.blueGrey100,
	accent2Color: Colors.deepOrange400,
	accent3Color: Colors.deepOrangeA700,
	textColor: Colors.grey900,
	alternateTextColor: Colors.grey500,
	canvasColor: Colors.white,
	borderColor: Colors.grey300
};

// default typekit
var _typekit = {
	XS: 10,
	SM: 12,
	MD: 14,
	LG: 18,
	XL: 20,
	XXL: 24,
	FINE: 100,
	THIN: 200,
	NORM: 300,
	HEAVY: 400,
	BOLD: 500,
	BOLDER: 600,
	BOLDEST: 700
};


var UPPERCASE = "uppercase";
var CAPITALIZE = "capitalize";


function clone(object){
	return merge({},object);
}

/**
*
* @param {object} palette
* @param {object} typekit
* @param {object} themeOptions
*/
function defaultComponentStyles(palette,typekit,themeOptions){
	return clone({
		navBar:{
			bgColor: undefined
		},
		navMenu:{
			bgImage:undefined,
			bgColor: undefined,
			bgPosition: undefined,
			bgRepeat: undefined
		},
		navMenuChevron:{
			color: palette.primary1Color,
			fontSize: 28,
			verticalAlign: "middle"
		},
		avatar: {
			border: "2px solid " + palette.accent2Color,
			display: "inline-block",
			width: 66,
			height: 66,
			borderRadius: "50%"
		}
	});
}

/**
*
* @param {object} palette
* @param {object} typekit
* @param {object} themeOptions
*/
function getImmutableStyles(palette,typekit,themeOptions){
	var offsetForStatusBar = (themeOptions.expectStatusBar && themeOptions.onDevice) ? 20 : 0;
	return clone({
		navBar: {
			offsetTop: offsetForStatusBar
		},
		view: {
			offsetTop: offsetForStatusBar
		},
		overlay: {
			top: offsetForStatusBar
		}
	});
}




function uniqueID(){
  function chr4(){
    return Math.random().toString(16).slice(-4);
  }
  return chr4() + chr4() +
    '-' + chr4() +
    '-' + chr4() +
    '-' + chr4() +
    '-' + chr4() + chr4() + chr4();
}


/**
*
* @param {object} palette - color palette to constuct component styles with
* @param {object} typekit - typography to construct component styles with
* @param {function|object} [getComponentStyles] - a function that returns a component style object, or a style object literal.
	Accepts parameters `palette (object)`,`typekit (object)`, and `themeOptions (object)`
*/
function MkappTheme(palette,typekit,getComponentStyles){

	// ensure constructor
	if(!(this instanceof MkappTheme)) return new MkappTheme(palette,typekit,getComponentStyles);

	EventEmitter.call(this);

	/*
	*
	* private properties
	*
	*/
	
	var _id,componentStyles,themeOptions;

	_id = uniqueID();
	themeOptions = {
		preferMaterial: false,
		onDevice: false,
		expectStatusBar: true,
		platform: 'browser'
	};

	palette = merge({},_palette,palette);
	typekit = merge({},_typekit,typekit);
	// set default styles
	componentStyles = defaultComponentStyles(palette,typekit,themeOptions);
	// merge in styling passed to constructor and immutable styles
	componentStyles = updateComponentStyles(componentStyles,getComponentStyles);

	/*
	*
	* public read-only properties
	*
	*/

	Object.defineProperty(this,'_id',{
		value: _id,
		writable: false,
		configurable: false,
		enumerable: false
	});

	Object.defineProperty(this,'options',{
		get: function(){
			return merge({},themeOptions);
		},
		configurable: false,
		enumerable: false
	});

	/*
	*
	* private methods
	*
	*/

	if(typeOf(getComponentStyles) !== 'function'){
		getComponentStyles = function(){};
	}

	function updateComponentStyles(Object_lastStyles,updater){
		var newStyles;
		if(typeOf(updater) === 'function'){
			newStyles = updater(palette,typekit,themeOptions);
		}else if(typeOf(updater) === 'object'){
			newStyles = updater;
		}
		return merge(
			{},
			Object_lastStyles,
			getComponentStyles(palette,typekit,themeOptions),
			newStyles,
			getImmutableStyles(palette,typekit,themeOptions)
		);
	}

	/*
	*
	* public methods
	*
	*/

	this.getPalette = function getPalette(){
		return clone(palette);
	};

	this.setPalette = function setPalette(newPalette){
		palette = merge({},palette,newPalette);
		this.emit('update');
		return clone(palette);
	};

	this.getTypekit = function getTypekit(){
		return clone(typekit);
	};

	this.setTypekit = function setTypekit(newTypekit){
		typekit = merge({},typekit,newTypekit);
		this.emit('update');
		return clone(typekit);
	};

	this.getComponentStyles = function getComponentStyles(component){
		if(component !== undefined){
			return clone(componentStyles[component]);
		}else{
			return clone(componentStyles);
		}
	};

	this.setComponentStyles = function setComponentStyles(newStyles){
		componentStyles = updateComponentStyles(componentStyles,newStyles);
		this.emit('update');
	};

	this.setOptions = function setOptions(newOptions){
		var lastOptions = themeOptions;
		var configurableOptions = ['preferMaterial','onDevice','expectStatusBar','platform'];

		if(newOptions.platform === 'Android') newOptions.preferMaterial = true;
		themeOptions = merge({},themeOptions,pick(newOptions,configurableOptions));

		if(!isEqual(lastOptions,themeOptions)){
			componentStyles = updateComponentStyles(componentStyles);
			this.emit('update');
		}
	};
}

util.inherits(MkappTheme,EventEmitter);

module.exports = MkappTheme;
