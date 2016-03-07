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
