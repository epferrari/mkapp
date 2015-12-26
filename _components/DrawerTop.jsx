import React
  from 'react';
import Overlay
  from './Overlay';
import ThemeStyleMerger
  from '../theme/utils/styleMerger';
import {pick,merge}
  from 'lodash';
import MkappThemeMixin
	from '../theme/mixin';


var DrawerTop = React.createClass({
  mixins: [MkappThemeMixin],
  propTypes: {
		open: React.PropTypes.bool,
		style: React.PropTypes.object,
		onExit: React.PropTypes.func
	},
  prepareStyles(){
    var defaultStyles = {
      bgColor:'rgb(0,0,0)',
      color: 'rgb(255,255,255)',
      height: (global.screen.height / 4),
      minHeight:150,
      boxShadow:"rgba(0,0,0,0.5) 0px 3px 6px"
    };
    let themeStyles =  merge({},this.getThemeStyles('drawer'),this.getThemeStyles('drawerTop'));
    let okStyles = ['backgroundColor','color','height','minHeight','boxShadow'];
    let _styles = pick(ThemeStyleMerger(this.props.style,themeStyles,defaultStyles),okStyles);
    _styles.maxHeight = global.screenHeight;
    return _styles;
  },
  render(){
    return (
      <Overlay
        focusOnEnter={false}
        {...this.props}
        style={this.prepareStyles()}
        position="top">
        {this.props.children}
      </Overlay>
    );
  }
});

export default DrawerTop;
