## Overlay


- **open** `boolean` - should the overlay be rendered open
- **position** one of `top`,`left`,`bottom`,`right` - where the overlay animates to/from
- **didExit** `function` *REQUIRED* - a callback to execute when the overlay completes its exit animation. Since the overlay can
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
			didExit={() => this.setState({overlayOpen: false})}/>
		);

		return (
			<View fixed={overlay}>
				<button onClick={() => this.setState({overlayOpen: true])}>Show Overlay</button>
			</View>
		);
	}
