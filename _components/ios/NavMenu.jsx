import React from 'react';
import NavMenu from '../NavMenu';

var iosNavMenu = React.createClass({
  render(){
    return <NavMenu {...this.props} position="top"/>;
  }
});

module.exports = iosNavMenu;
