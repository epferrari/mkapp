# mkapp - Theme

- [overview](#overview)
- [theme basics](#theme-basics)
- [creating a theme](#create-theme)
- [creating a custom theme](#custom-theme)
- [using the ThemeProvider](#theme-provider)
- [accessing theme properties](#accessing-theme)
- [updating a theme](#update-theme)
- [theme API](#theme-api)

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
## Creating a Custom Theme
This will create a theme object and make it available to all the `mkapp` components in your app. In this case, since no arguments were provided, the default theme is assumed. To customize the theme, pass arguments to `MkappTheme`

	var myCustomTheme = new MkappTheme(Object palette, Object typekit, Function getComponentStyles);

The first two arguments to `MkappTheme`'s constructor are `palette` and `typekit`, object literals of the same shape listed [above](#theme-basics). They are immediately merged into the default theme palette and typekit, overriding mkapp's default colors and font settings.

The third argument, `getComponentStyles`, is a transformation function. It's called internally by your `mkapp theme` each and every time the theme is updated, and gets passed these three arguments:

- **palette** `object` - the theme's current color palette
- **typekit** `object` - the theme's current typekit
- **themeOptions** `object` - the theme's current options
	- preferMaterial `boolean`
	- onDevice `boolean`
	- platform `string`
	- expectStatusBar `boolean`

Assuming you've defined a `customPalette` and `customTypekit`, declaring a custom theme with `getComponentStyles` might look like this:

	var customTheme = new MkappTheme(customPalette, customTypekit, function(palette,typekit,themeOptions){
		return {
			navBar: {
				bgColor: themeOptions.preferMaterial ? palette.primary1Color : palette.primary2Color,
				textColor: themeOptions.preferMaterial ? palette.accent1Color : palette.accent2Color
			},
			view: {
				fontWeight: typekit.THIN,
				bgImage: themeOptions.onDevice ? "url(assets/img/corgi.jpg)" : null
			}
		};
	});

# 

<a name="theme-provider"></a>
## Using the ThemeProvider Component

The `ThemeProvider` component is a convenient top-level wrapper for your
	entire application's `mkapp` components. It takes care of setting a theme on
	context, doing device detection, and updating the theme accordingly. If you're
	planning on using mkapp as part of a Cordova project to build javascript
	apps for native devices, use the `ThemeProvider` and [hybrid components](#).



| Prop | PropType | Default | Description |
| --- | --- | --- | --- |
| [mkappTheme] | <code>object</code> | <code>&lt;MkappTheme instance&gt;</code> | a `MkappTheme` instance |
| [detectDevice] | <code>boolean</code> | <code>true</code> | Should the ThemeProvider listen to Cordova's 	`deviceready` event and respond by updating some styles internally? |
| [autoUpdate] | <code>boolean</code> | <code>true</code> | Should the ThemeProvider update all components 	in its render tree when its theme is updated? |
| [expectStatusBar] | <code>boolean</code> | <code>true</code> | Should the ThemeProvider add extra padding 	to the navigation bar and views to offset for a device status bar? 	`detectDevice` must be set to true for this to take effect |


###### A simple example
	var customTheme = new MkappTheme(customPalette);
	
	var App = React.createClass({
	
		render(){
			return (
				<ThemeProvider 
					mkappTheme={customTheme}
					detectDevice={true}
					autoUpdate={true}
					expectStatusBar={true}>
					
					<HybridNavBar/>
					<HybridView title="Home"/>
				
				</ThemeProvider>
			);
		}
	});
	
# 

<a name="accessing-theme-properties"></a>

## Accessing Theme Properties

Accessing theme properties is easy. In any component that has a theme on its context, define `mkappTheme` as a `contextType`.

	contextTypes: {
		mkappTheme: React.PropTypes.Object
	}
	
Then, in the component's render method, get theme's styles:

	this.context.mkappTheme.getPalette()
	this.context.mkappTheme.getTypekit()
	this.context.mkappTheme.getComponentStyles(<component name>)
	this.context.mkappTheme.options
	
# 

<a name="update-theme"></a>
## Updating a Theme

When a theme is updated via any of its four `set*` methods, the theme's internal `componentStyles` object is updated based on any new data passed to palette, typekit, and options, and merged with any newly-declared componentStyles. If a `ThemeProvider` is being used with `autoUpdate={true}`, the updated styling will be instantly applied to all components in the app. If not, a re-render will need to be triggered from the top of the render tree for the changes to take effect.


<a name="theme-api"></a>
# Theme API


<a name="new_MkappTheme_new"></a>
### new MkappTheme(palette, typekit, [getComponentStyles])


| Prop | PropType | Description |
| --- | --- | --- |
| palette | <code>object</code> | color palette to constuct component styles with |
| typekit | <code>object</code> | typography to construct component styles with |
| [getComponentStyles] | <code>function</code> &#124; <code>object</code> | a function that returns a component style object, or a style object literal. 	Accepts parameters `palette (object)`,`typekit (object)`, and `themeOptions (object)` |

<a name="MkappTheme+options"></a>
### mkappTheme.options
current option state of a theme: `preferMaterial`,`onDevice`,`expectStatusBar`,and `platform`


<a name="MkappTheme+getPalette"></a>
### mkappTheme.getPalette()
get a theme's palette


<a name="MkappTheme+setPalette"></a>
### mkappTheme.setPalette(newPalette)
update a theme's palette


**Emits**: <code>[update](#MkappTheme+event_update)</code>  

| Prop | PropType | Description |
| --- | --- | --- |
| newPalette | <code>object</code> | the new palette to merge into the theme's existing palette |

<a name="MkappTheme+getTypekit"></a>
### mkappTheme.getTypekit()
get a theme's typekit


<a name="MkappTheme+setTypekit"></a>
### mkappTheme.setTypekit(newTypekit)
update a theme's typekit


**Emits**: <code>[update](#MkappTheme+event_update)</code>  

| Prop | PropType | Description |
| --- | --- | --- |
| newTypekit | <code>object</code> | the new typekit to merge into the theme's existing typekit |

<a name="MkappTheme+getComponentStyles"></a>
### mkappTheme.getComponentStyles([componentName])
get a theme's componentStyles object



| Prop | PropType | Description |
| --- | --- | --- |
| [componentName] | <code>string</code> | the key name of the component to retreive styles for. 		if nothing is passed, the entire component styles collection is returned. |

<a name="MkappTheme+setComponentStyles"></a>
### mkappTheme.setComponentStyles(newStyles)
update a theme's component styles


**Emits**: <code>[update](#MkappTheme+event_update)</code>  

| Prop | PropType | Description |
| --- | --- | --- |
| newStyles | <code>object</code> &#124; <code>function</code> | the new component styles definition. If 		passed as a function, the function will be called with `(palette,typekit,themeOptions)`, 		and should return a componentStyles object to be merged into the theme's current 		componentStyles. |

<a name="MkappTheme+setOptions"></a>
### mkappTheme.setOptions(newOptions)
update a theme's options state


**Emits**: <code>[update](#MkappTheme+event_update)</code>  

| Prop | PropType | Description |
| --- | --- | --- |
| newOptions | <code>object</code> | new options the theme will use to create component styles. |

<a name="MkappTheme+event_update"></a>
### "update"
Event: emitted when theme is changed


