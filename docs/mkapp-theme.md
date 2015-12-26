# mkapp - Theme

- [overview](#overview)
- [theme basics](#theme-basics)
- [creating a theme](#create-theme)
- [creating a custom theme](#custom-theme)
- [updating a theme](#update-theme)
- [theme methods](#theme-methods)

<a name="overview"></a>
## Overview

A theme in `mkapp` provides an application-level interface to style components. You might think of it as a stylesheet of sorts, but without global namespace collisions or unintended consequences from cascading styles. If you've used [material-ui](http://material-ui.com), the concept of a theme should be familiar. In fact, mkapp's theming system is highly inspired by material-ui's implementation, and strives to be compatible with the material-ui's `MuiTheme` so that theme declarations can be shared between the two.

Mkapp themes are essentially an object of component styles that are created from two base objects (palette and typekit) and a boolean (useMaterial). Accessing the styles is as easy as calling `this.context.mkappTheme.getComponentStyles(<component>)`, where component is a lower-camelcase string of the component's displayName (and filename). For example, the `AppNav` component's theme styles could be accessed anywhere in your application by:
	 
	 this.context.mkappTheme.getComponentStyles("appNav")

For styling individual components or overriding theme styles, see [the component styling guide](https://github.com/epferrari/mkapp/blob/master/docs/component-styling.md).


<a name="theme-basics"></a>
## Theme Basics - Palette and Typekit

A palette is a Javascript object literal that defines the color palette of your application's components. It takes the exact shape of the `MuiTheme.palette`, so sharing the same object between the two is easy.

	var palette = {
		primary1Color: ,
		primary2Color: ,
		primary3Color: ,
		accent1Color: ,
		accent2Color: ,
		accent3Color: ,
		textColor: ,
		alternateTextColor: ,
		canvasColor: ,
		borderColor: 
	};

A typeset is a Javascript object literal that defines font sizes and weights.

	var typekit = {
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

<a name="create-theme"></a>
## Creating a mkapp Theme

At its most basic, import the theme constructor in your top-level module:

	import Theme from 'mkapp/theme';
	var myTheme = new Theme();
	
Then include it on context:

	var App = React.createClass({
		getChildContext(){
			return {mkappTheme: myTheme};
		},
		childContextTypes:{
			mkappTheme: React.PropTypes.object
		}
		...
	});

<a name="custom-theme"></a>
### Creating a Customized Theme
This will create a theme object and make it available to all the `mkapp` components in your app. In this case, since no arguments were provided, the default theme is assumed. To customize the theme, pass arguments to `Theme`
	
	var myCustomTheme = new Theme(<palette>,<typekit>
	

