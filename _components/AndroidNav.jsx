import React from 'react';
import AppNav from './AppNav';
import {merge} from 'lodash';

var androidMenuStyles = {
  width:"70%",
  maxWidth:300,
  bgColor:'black'
};

var AndroidNav = React.createClass({
  render(){
    return (
      <AppNav
        {...this.props}
        menuPosition="left"
        materialDesign={true}
        menuStyle={merge({},androidMenuStyles,this.props.menuStyle)}/>
    );
  }
});

export default AndroidNav;
