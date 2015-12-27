import React
  from 'react';
import NavTitle
  from './NavTitle';

var NavTitleCenter = React.createClass({
  render(){
    return (
      <NavTitle
      capitalize={false}
      {...this.props}
      alignment="center"
      maxLength={16}
      width={6}/>
    );
  }
});

module.exports = NavTitleCenter;
