import {merge,pick,contains} from 'lodash';
import React from 'react';
import MkappThemeStyleMerger
	from '../../theme/utils/styleMerger';

module.exports = {
  getDefaultProps(){
    return {
      offsetTop: 0
    };
  },
  propTypes:{
    navbarColor: React.PropTypes.string,
    textColor: React.PropTypes.string,
    showMenuButton: React.PropTypes.bool,
    menuButtonLabel: React.PropTypes.string,
    menuButtonIconElement: React.PropTypes.element,
    onMenuButtonClick: React.PropTypes.func.isRequired,
    connectionStatus: React.PropTypes.oneOf([0,1,2]),
    title: React.PropTypes.string,
    showActivity: React.PropTypes.bool,
    offsetTop: React.PropTypes.number
  },
  prepareStyles(){
    // base styles
    let baseStyles = this.getBaseStyles();
    // theme styles
		let themeStyles_navbar = this.getThemeStyles('navBar');
		// props styles, override theme styles
		let propsStyles_navbar = {
			bgColor: this.props.navbarColor,
			textColor: this.props.textColor
		};

		// only use backgroundColor and color from theme and props, props override theme
		let okProps = ['backgroundColor','color'];
		let navbarStyles = pick(MkappThemeStyleMerger(propsStyles_navbar,themeStyles_navbar),okProps);

    // render extra height for status bar?
		if(contains([0,1],this.props.connectionStatus)){
      merge(navbarStyles,{
		    height: baseStyles.height + 6,
		    maxHeight: baseStyles.height + 6
      });
    }

		// return rendering styles
		return {
			navbar: merge({},baseStyles,navbarStyles),
			navbar_statusBar: merge({},pick(navbarStyles,'backgroundColor','color'))
		};
  }
};
