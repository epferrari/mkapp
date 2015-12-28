import React from 'react';
import {merge} from 'lodash';

var styles = {
  paddingRight:0,
  paddingLeft:0,
  marginLeft:"auto",
  marginRight:"auto",
  maxWidth:980
};

var styleSheetId = 'mkapp-stylesheet';
var styleSheet = document.getElementById(styleSheetId) || document.createElement('style');
styleSheet.id = styleSheetId;
styleSheet.innerHTML += "div.mkapp-container::after{content:''; display:table}";
styleSheet.innerHTML += "div.mkapp-container::after{clear: both;content:''; display:table}";
(document.head || document.getElementsByTagName('head')[0]).appendChild(styleSheet);

var Container = React.createClass({
  render(){
    return (
      <div className="mkapp-container" style={merge({},styles,this.props.style)}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = Container;
