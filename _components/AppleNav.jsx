import React from 'react';
import AppNav from './AppNav';
import {merge} from 'lodash';

var AppleNav = React.createClass({
  render(){
    return (
      <AppNav
        {...this.props}
        menuPosition="top"
        menuStyle={merge({},this.props.menuStyle,{width:"100%"})}/>
    );
  }
});

export default AppleNav;
