import React from 'react';
import AppNav from './AppNav';

var androidMenuStyles = {
  width:"70%",
  maxWidth:300,
  backgroundColor:'black'
};

var AndroidNav = React.createClass({
  render(){
    return (
      <AppNav
        {...this.props}
        menuPosition="left"
        materialDesign={true}
        menuStyle={androidMenuStyles}/>
    );
  }
});

export default AndroidNav;
