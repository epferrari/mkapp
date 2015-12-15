import React from 'react';
import AppNav from './AppNav';

var appleNavStyles = {
  width:"100%"
};

var AppleNav = React.createClass({
  render(){
    return (
      <AppNav
        {...this.props}
        menuPosition="top"
        menuStyle={appleNavStyles}/>
    );
  }
});

export default AppleNav;
