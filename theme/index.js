var merge = require('lodash').merge;
var Colors = require('material-ui/lib/styles/colors');
var typeOf = require('@epferrari/js-utils/lib/typeOf').default;


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


const UPPERCASE = "uppercase";
const CAPITALIZE = "capitalize";


var _getComponentStyles = function(palette,typekit){

	return {
		mainMenu:{
			bgImage:undefined,
			bgColor: undefined,
			bgPosition: undefined,
			bgRepeat: undefined
		},
		navbar:{
			bgColor: undefined
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
	};
};


function Theme(palette,typekit,getComponentStyles){

	if(typeOf(getComponentStyles) !== 'function'){
		getComponentStyles = function(){return {}; };
	}

	palette = merge({},_palette,palette);
	typekit = merge({},_typekit,typekit);
	var componentStyles = merge({},_getComponentStyles(palette,typekit),getComponentStyles(palette,typekit));

	this.getPalette = function(){
		return merge({},palette);
	};

	this.setPalette = function(newPalette){
		palette = merge({},palette,newPalette);
		return this.getPalette();
	};

	this.getTypekit = function(){
		return merge({},typekit);
	};

	this.setTypekit = function(newTypekit){
		typekit = merge({},typekit,newTypekit);
		return this.getTypekit();
	};

	this.getComponentStyles = function(component){
		if(component !== undefined){
			return merge({},componentStyles[component]);
		}else{
			return merge({},componentStyles);
		}
	};

	this.setComponentStyles = function(newStyles){
		if(typeOf(newStyles) === 'function'){
			componentStyles = merge({},componentStyles,newStyles(palette,typekit));
		}else if(typeOf(newStyles) === 'object'){
			componentStyles = merge({},componentStyles,newStyles);
		}
	};
}

module.exports = Theme;
