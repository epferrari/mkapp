import React from 'react';
import AppNav from '../AppNav';
import MaterialNavBar from './NavBar';
import MaterialNavMenu from './NavMenu';

var MaterialAppNav = React.createClass({
  render(){
    return (
      <AppNav {...this.props}>
        <MaterialNavBar/>
        <MaterialNavMenu/>
      </AppNav>
    );
  }
});

module.exports = MaterialAppNav;
