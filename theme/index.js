var merge = require('lodash').merge;
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


function copy(object){
	return merge({},object);
}

/**
*
* @param {object} palette
* @param {object} typekit
* @param {boolean} preferMaterial
*/
function defaultComponentStyles(palette,typekit,preferMaterial){
	return copy({
		appNav:{
			bgColor: undefined
		},
		appNavMenu:{
			bgImage:undefined,
			bgColor: undefined,
			bgPosition: undefined,
			bgRepeat: undefined
		},
		iconNavNext:{
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
* @param {boolean} preferMaterial - construct styles in material design style
* @param {boolean} onDevice - construct styles expecting a mobile device
*/
function getImmutableStyles(preferMaterial,onDevice){
	var navbarHeight = preferMaterial ? 60 : 30;
	navbarHeight = onDevice ? navbarHeight + 20 : navbarHeight;
	return copy({
		appNav: {
			height: navbarHeight,
			maxHeight: navbarHeight,
			paddingTop: onDevice ? 20 : 0
		},
		view: {
			minHeight: global.screen.height - navbarHeight,
			marginTop: navbarHeight + 10
		},
		overlay: {
			top: onDevice ? 20 : 0
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
* @param {function} [getComponentStyles] - a function that returns a component style object.
	Accepts parameters `palette (object)`,`typekit (object)`, and `preferMaterial (boolean)`
*/
function MkappTheme(palette,typekit,getComponentStyles){

	// ensure constructor
	if(!(this instanceof MkappTheme)) return new MkappTheme(palette,typekit,getComponentStyles);

	var _id,preferMaterial,onDevice,componentStyles;

	EventEmitter.call(this);

	palette = merge({},_palette,palette);
	typekit = merge({},_typekit,typekit);
	preferMaterial = false;
	onDevice = false;

	_id = uniqueID();
	Object.defineProperty(this,'_id',{
		value: _id,
		writable: false,
		configurable: false,
		enumberable: false
	});

	if(typeOf(getComponentStyles) !== 'function'){
		getComponentStyles = function(){return {}; };
	}

	componentStyles = merge({},
		defaultComponentStyles(palette,typekit,preferMaterial),
		getComponentStyles(palette,typekit,preferMaterial),
		getImmutableStyles(preferMaterial,onDevice)
	);

	this.getPalette = function(){
		return copy(palette);
	};

	this.setPalette = function(newPalette){
		palette = merge({},palette,newPalette);
		this.emit('update');
		return copy(palette);
	};

	this.getTypekit = function(){
		return copy(typekit);
	};

	this.setTypekit = function(newTypekit){
		typekit = merge({},typekit,newTypekit);
		this.emit('update');
		return copy(typekit);
	};

	this.getComponentStyles = function(component){
		if(component !== undefined){
			return copy(componentStyles[component]);
		}else{
			return copy(componentStyles);
		}
	};

	this._updateForDevice = function(platform){
		var shouldUpdate = false;
		if(!onDevice){
			onDevice = true;
			shouldUpdate = true;
		}
		if(!preferMaterial && (platform === 'Android')){
			preferMaterial = true;
			shouldUpdate = true;
		}
		componentStyles = merge({},
			defaultComponentStyles(palette,typekit,preferMaterial),
			getComponentStyles(palette,typekit,preferMaterial),
			getImmutableStyles(preferMaterial,onDevice)
		);
		if(shouldUpdate) this.emit('update');
	};

	this.setComponentStyles = function(newStyles){
		if(typeOf(newStyles) === 'function'){
			componentStyles = merge(
				{},
				componentStyles,
				newStyles(palette,typekit,preferMaterial),
				getImmutableStyles(preferMaterial,onDevice)
			);
		}else if(typeOf(newStyles) === 'object'){
			componentStyles = merge(
				{},
				componentStyles,
				newStyles,
				getImmutableStyles(preferMaterial,onDevice)
			);
		}
		this.emit('update');
	};

	Object.defineProperty(this,'preferMaterial',{
		get: function(){
			return preferMaterial;
		},
		set: function(bool){
			if(typeof bool === 'boolean'){
				preferMaterial = bool;
				this.emit('update');
			}
		},
		configurable: false
	})
}

util.inherits(MkappTheme,EventEmitter);

module.exports = MkappTheme;
