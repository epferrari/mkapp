import React from 'react';
import NavMenu from '../NavMenu';
import NavMenuItem from '../NavMenu/NavMenuItem';


var MaterialNavMenu = React.createClass({
  render(){
    return (
      <NavMenu
        {...this.props}
        position="left"
        itemRenderer={<NavMenuItem renderIcon={false} uppercase={false}/>}/>
    );
  }
});

module.exports = MaterialNavMenu;
