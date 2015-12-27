import React
  from 'react';
import NavTitle
  from './NavTitle';

var NavTitleCenter = React.createClass({
  render(){
    return (
      <NavTitle
        capitalize={false}
        width={6}
        maxLength={16}
        {...this.props}
        alignment="center"/>
    );
  }
});

module.exports = NavTitleCenter;
