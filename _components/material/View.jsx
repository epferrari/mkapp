import React from 'react';
import View from '../View';

var MaterialView = React.createClass({
  render(){
    return <View {...this.props} navbarOffset={60}/>;
  }
});

module.exports = MaterialView;
