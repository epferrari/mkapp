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


var DrawerLeft = React.createClass({
  mixins: [MkappThemeMixin],
  propTypes: {
		open: React.PropTypes.bool,
		style: React.PropTypes.object,
		onExit: React.PropTypes.func
	},
  prepareStyles(){
    var defaultStyles = {
      width:"70%",
      maxWidth:300,
      bgColor:'rgb(0,0,0)',
      color:"rgb(255,255,255)"
    };
    let okStyles = ['backgroundColor','color','width','minWidth','maxWidth'];
    let themeStyles =  merge({},this.getThemeStyles('drawer'),this.getThemeStyles('drawerLeft'));
    return pick(ThemeStyleMerger(this.props.style,themeStyles,defaultStyles),okStyles);
  },
  render(){
    return (
      <Overlay
        {...this.props}
        style={this.prepareStyles()}
        position="left">
        {this.props.children}
      </Overlay>
    );
  }
});

export default DrawerLeft;
