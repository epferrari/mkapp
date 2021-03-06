import React
  from 'react';
import NavTitle
  from './NavBarTitle';

var NavTitleLeft = React.createClass({
  render(){
    return (
      <NavTitle
        capitalize={true}
        maxLength={20}
        width={8}
        {...this.props}
        alignment="left"/>
    );
  }
});

module.exports = NavTitleLeft;
