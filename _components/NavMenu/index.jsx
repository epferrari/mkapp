import React from 'react';
import DrawerLeft from '../DrawerLeft';
import DrawerRight from '../DrawerRight';
import Curtain from '../Curtain';
import NavMenuItem from './NavMenuItem';
import {merge,map} from 'lodash';


var menuPositions = {
	left: DrawerLeft,
	right: DrawerRight,
	top: Curtain
};



var NavMenu = React.createClass({
  propTypes: {
    menuItems: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        label: React.PropTypes.string,
        title: React.PropTypes.string,
        path: React.PropTypes.string.isRequired
      })
    ),
    onRouteSelection: React.PropTypes.func.isRequired,
    animateMenuItems: React.PropTypes.bool,
    style: React.PropTypes.object,
    itemRenderer: React.PropTypes.object,
    position: React.PropTypes.oneOf(['left','right','top'])
  },

  getDefaultProps(){
    return {
      menuItems: [],
      itemRenderer: (<NavMenuItem/>),
			onRouteSelection: function(){},
      position: 'right'
    };
  },

	renderNavItems(shouldAnimate){
		return map(this.props.menuItems, (route,idx) => {
			return (
        React.cloneElement(this.props.itemRenderer,{
					key: idx,
          shouldAnimate: shouldAnimate,
          animationDelay: (300 + idx * 50),
          name: (route.label || route.title),
          path: route.path,
          onSelection: this.props.onRouteSelection
        })
			);
		});
	},

  render(){
    let styles = this.prepareStyles();
    let OverlayComponent = menuPositions[this.props.position];
    return (
      <OverlayComponent {...this.props}>
        <div style={styles.menu_INNER}>
          {this.renderNavItems(this.props.open)}
          {this.props.children}
        </div>
      </OverlayComponent>
    );
  },

  prepareStyles(){
    return merge({},{
      menu_INNER:{
        position:"relative",
        paddingTop:16,
        paddingRight:8,
        paddingLeft:8,
        //paddingBottom:166,
        minHeight:global.screen.height
    	}
		});
  }
});

module.exports = NavMenu;
