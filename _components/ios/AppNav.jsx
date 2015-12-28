import React from 'react';
import AppNav from '../AppNav';
import AppleNavBar from './NavBar';
import AppleNavMenu from './NavMenu';

var iosAppNav = React.createClass({
  render(){
    return (
      <AppNav {...this.props}>
        <AppleNavBar/>
        <AppleNavMenu/>
      </AppNav>
    );
  }
});

module.exports = iosAppNav;
