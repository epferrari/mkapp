//import React from 'react';
//import FontIcon from '@epferrari/react-fa-icon';
//import {AppBar} from 'material-ui';

var React = require('react');
var FontIcon = require('@epferrari/react-fa-icon');
var AppBar = require('material-ui').AppBar;

var CustomAppBar = React.createClass({
  getRightIcon(){
    if(this.props.showLoading){
      return <FontIcon icon="spinner" spin/>;
    }else{
      return <span/>;
    }
  },
  render(){
    return (
      <AppBar
        title={this.props.title}
        iconElementRight={this.getRightIcon()}
        style={{backgroundColor: this.props.navbarColor}}/>
    );
  }
});

module.exports = CustomAppBar;
