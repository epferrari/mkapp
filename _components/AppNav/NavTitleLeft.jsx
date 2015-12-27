import React
  from 'react';
import NavTitle
  from './NavTitle';

var NavTitleLeft = React.createClass({
  render(){
    return (
      <NavTitle
      capitalize={true}
      {...this.props}
      alignment="left"
      maxLength={20}
      width={8}/>
    );
  }
});

module.exports = NavTitleLeft;
