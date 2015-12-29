# mkapp - Theme

- [overview](#overview)
- [theme basics](#theme-basics)
- [creating a theme](#create-theme)
- [creating a custom theme](#custom-theme)
- [using the ThemeProvider](#theme-provider)
- [accessing theme properties](#accessing-theme)
- [updating a theme](#update-theme)
- [theme methods](#theme-methods)

<a name="overview"></a>
## Overview

A theme in `mkapp` provides an application-level interface to style components. You might think of it as a stylesheet of sorts, but without global namespace collisions or unintended consequences from cascading styles. If you've used [material-ui](http://material-ui.com), the concept of a theme should be familiar. In fact, mkapp's theming system is highly inspired by material-ui's implementation, and strives to be compatible with the material-ui's `MuiTheme` so that theme declarations can be shared between the two.

Mkapp themes are essentially a keyed collection of object literals, each representing a component style. The styles are created from two base objects (palette and typekit) and a `themeOptions` object. Accessing the styles is as easy as calling `this.context.mkappTheme.getComponentStyles(String component)`, where component is a lower-camelcase string of the component's displayName (and filename). For example, the `NavBar` component's theme styles could be accessed anywhere in your application by:
	 
	 this.context.mkappTheme.getComponentStyles("navBar")

For styling individual components or overriding theme styles, see [the component styling guide](https://github.com/epferrari/mkapp/blob/master/docs/component-styling.md).

# 

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

A typekit is a Javascript object literal that defines font sizes and font weights.

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

# 

<a name="create-theme"></a>
## Creating a mkapp Theme

At its most basic, import the theme constructor in your top-level module:

	import MkappTheme from 'mkapp/theme';
	var myTheme = new MkappTheme();
	
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

# 

<a name="custom-theme"></a>
### Creating a Customized Theme
This will create a theme object and make it available to all the `mkapp` components in your app. In this case, since no arguments were provided, the default theme is assumed. To customize the theme, pass arguments to `MkappTheme`
	
	var myCustomTheme = new MkappTheme(Object palette,Object typekit,Function getComponentStyles);

The first two arguments to `MkappTheme`'s constructor are `palette` and `typekit`, object literals of the same shape listed [above](#theme-basics). They are immediately merged into the default theme palette and typekit, overriding the default styles. 

The third argument, `getComponentStyles`, is a transformation function called internally by your theme during a merging sequence whenever your theme is updated. `getComponentStyles` is called each time with: 

- `palette` - the theme's current color palette
- `typekit` - the theme' current typekit
- `themeOptions` - the theme's current options
	- **preferMaterial** `boolean`
	- **onDevice** `boolean`
	- **platform** `string`
	- **expectStatusBar** `boolean`

# 
	
<a name="theme-provider"></a>
###Using the ThemeProvider

