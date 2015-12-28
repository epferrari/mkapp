import React
  from 'react';
import MkappTheme
  from '../theme';
import {merge}
  from 'lodash';

var ThemeProvider = React.createClass({
  propTypes:{
    detectDevice: React.PropTypes.bool,
    autoUpdate: React.PropTypes.bool,
    expectStatusBar: React.PropTypes.bool
  },
  getDefaultProps(){
    return {
      detectDevice: true,
      autoUpdate: true,
      expectStatusBar: true
    };
  },
  getInitialState(){
    return {
      cordovaDeviceReady: false,
      cordovaPlatform: 'browser',
      mkappTheme: this.props.mkappTheme || new MkappTheme()
    };
  },

  componentWillMount(){
    document.addEventListener('deviceready',() => {
      let platform = (global.device) ? global.device.platform : "browser";
      let theme = this.state.mkappTheme;
      if(this.props.detectDevice){
        theme.setOptions({
          onDevice: true,
          platform: platform,
          expectStatusBar: this.props.expectStatusBar
        });
      }
      this.setState({
        cordovaDeviceReady: true,
        cordovaPlatform: platform,
        mkappTheme: theme
      });
    });
  },

  componentDidMount(){
    // ensure a re-render is triggered when mkappTheme is updated
    let theme = this.state.mkappTheme;
    if(this.props.autoUpdate){
      theme.on('update',() => {
        this.forceUpdate();
      });
    }
  },

  componentWillReceiveProps(nextProps){
    // reset theme-update listener when new theme is passed via props
    let {nextTheme} = nextProps;
    let currentTheme = this.state.mkappTheme;
    if(nextTheme && nextTheme._id !== currentTheme._id){
      // update the state theme with new theme passed from props
      if(this.state.cordovaDeviceReady){
        if(this.props.detectDevice || nextProps.detectDevice){
          nextTheme.setOptions({
            onDevice: this.state.cordoveDeviceReady,
            platform: this.state.cordovaPlatform,
            expectStatusBar: nextProps.expectStatusBar
          });
        }
      }
      currentTheme.removeAllListeners();
      if(this.props.autoUpdate || nextProps.autoUpdate){
        nextTheme.on('update',() => this.forceUpdate());
      }
      this.setState({mkappTheme: nextTheme});
    }else{
      currentTheme.setOptions({
        expectStatusBar: nextProps.expectStatusBar
      });
    }
  },

  getChildContext(){
    return {
      mkappTheme: this.state.mkappTheme,
      cordovaDeviceReady: this.state.cordovaDeviceReady,
      cordovaPlatform: this.state.cordovaPlatform
    };
  },

  childContextTypes:{
    mkappTheme: React.PropTypes.object.isRequired,
    cordovaDeviceReady: React.PropTypes.bool,
    cordovaPlatform: React.PropTypes.any
  },

  render(){
    let props = merge({},this.props);
    delete props.mkappTheme;
    delete props.children;
    return (
      <div>
        {React.Children.map(this.props.children, (child) => React.cloneElement(child,props))}
      </div>
    );
  }
});

export default ThemeProvider;
