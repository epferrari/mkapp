import React
  from 'react';
import MkappTheme
  from '../theme';
import {merge}
  from 'lodash';

var ThemeProvider = React.createClass({
  propTypes:{
    detectDevice: React.PropTypes.bool,
    autoUpdate: React.PropTypes.bool
  },
  getDefaultProps(){
    return {
      detectDevice: true,
      autoUpdate: true
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
        theme._updateForDevice(platform);
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
    if(this.props.autoUpdate){
      this.state.mkappTheme.on('update',() => this.forceUpdate());
    }
  },

  componentWillReceiveProps(nextProps){
    // reset theme-update listener when new theme is passed via props
    let {mkappTheme} = nextProps;
    let lastTheme = this.state.mkappTheme;
    if(mkappTheme && mkappTheme._id !== lastTheme._id){
      if(this.state.cordovaDeviceReady){
        if(this.props.detectDevice || nextProps.detectDevice){
          mkappTheme._updateForDevice(this.state.cordovaPlatform);
        }
      }
      lastTheme.removeAllListeners();
      if(this.props.autoUpdate || nextProps.autoUpdate){
        mkappTheme.on('update',() => this.forceUpdate());
      }
      this.setState({mkappTheme: mkappTheme});
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
