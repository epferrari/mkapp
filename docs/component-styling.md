# Component Styling - mkapp

### Overview
Components in `mkapp` are highly customizable through a combination of props and using a [mkappTheme](https://github.com/epferrari/mkapp/blob/master/docs/mkapp-theme.md), if one is available in `context`. They also have fallback styles if a theme is not available and no props are passed. The hierarchy for styling is as follows.

1. component props
2. mkapp theme
3. embedded component styles

That is to say, if you are utilizing a theme and define styles for your component there, your theme styles will override the default component styles. If you pass styling props, the props will override both the default styles AND the theme styles. This is great for when a component may change its style based on certain states in your application.

The `mkappTheme` does not attempt to anticipate application states or attempt to control how application states may change a component style; instead `mkapp` components allow for React's declarative approach to styling states: passing style via props.

### Setting component styles
Since `mkapp` components are complex and composited from many smaller React components, simply passing an object as a `style` prop would not produce desired results. Each component merges its props styles, theme styles, and default styles into specific nested components during the component's render. Therefore, both the theme and component props provide specific hooks to alter styles in a declarative way. 

What follows are the alterable styles in each component in mkapp, and how to hook into them either with the theme, using `<MkappTheme>.setComponentStyles()`, or by passing props directly to the component.

# 

## AppNav

### Style Props

- **textColor** `string`
- **navbarColor** `string` - the background color of the navbar
- **menuButtonLabel** `string` - A text label for the Menu Icon, leave blank to omit. Text color is inherited.
- **menuButtonIcon** `React element` - the actual icon to render. Text color is inherited, replacing `<FontIcon icon='bars'/>`. Color is inherited from navbar text color, unless style is declared as a prop on the component itself.
- **materialDesign** `boolean` - whether to render the app's navbar in the Material Design style (menu icon and view title on the left, rely on the device's physical back button) or a mobile apple.com-inspired menu, where the menu icon is on the right, the view title is in the center, and a back button is present on the left if the history stack has history.
- **menuStyle** `styles object` - style overrides for the menu overlay.

### Theme

Each is a key of the theme's internal `componentStyles` object. Set these using your theme instance's `.setComponentStyles()` method. See [mkappTheme](https://github.com/epferrari/mkapp/blob/master/docs/mkapp-theme.md).

- **appNav** 
	- bgColor/backgroundColor
	- textColor
- **appNavMenu** - styling for the menu overlay
	- bgColor/backgroundColor 
	- bgImage
	- bgRepeat
	- bgPosition

# 

## Overlay


- **open** `boolean` - should the overlay be rendered open
- **position** one of `top`,`left`,`bottom`,`right` - where the overlay animates to/from
- **onExit** `function` *REQUIRED* - a callback to execute when the overlay completes its exit animation. Since the overlay can
	internally handle closing itself, handle parent state changes here, see example below.
- **focusOnEnter** `boolean` - should the background app be darkened while the overlay is onscreen
- **closeButton** `boolean` - should the component render a close button
- **closeButtonStyles** `object` - respects `color` and `fontWeight` keys
- **style** `object` - overrides for the animating overlay component. Ignores the following, as they are internally maintained by the overlay in order to animate properly:
	- `top`
	- `left`
	- `right`
	- `bottom`
	- `position`
	- `overflowX`
	- `overflowY`
	- `backgroundSize`
	- `visibility`
	- `opacity`
	- `zIndex`
	- `display`	

### Example
	
	/* Your component's render method */
	
	render(){
		let overlay = (
		<Overlay 
			position="top"
			open={this.state.overlayOpen}
			closeButton={true}
			style={{height:200}}
			onExit={() => this.setState({overlayOpen: false})}/>
		);
		
		return (
			<View fixed={overlay}>
				<button onClick={() => this.setState({overlayOpen: true])}>Show Overlay</button>
			</View>
		);
	}
	
# 

## DrawerLeft, DrawerRight

### Style Props

- **style** `object` - respects `bgColor`,`backgroundColor`,`color`,`textColor`,`width`,`maxWidth`

### Theme

- **drawer**
	- bgColor/backgroundColor
	- color/textColor
	- width
	- maxWidth
	
- **drawerLeft**
	- bgColor/backgroundColor
	- color/textColor
	- width
	- maxWidth
	
# 

## DrawerTop, DrawerBottom

### Style Props

- **style** `object` - respects `bgColor`,`backgroundColor`,`color`,`textColor`,`height`,`minHeight`

### Theme

- **drawer**
	- bgColor/backgroundColor
	- color/textColor
	- height
	- minHeight
	
- **drawerLeft**
	- bgColor/backgroundColor
	- color/textColor
	- height
	- minHeight
	
# 
	

