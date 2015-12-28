import React from 'react';
import View from '../View';

var iosView = React.createClass({
  render(){
    return <View {...this.props} navbarOffset={30}/>;
  }
});

module.exports = iosView;
