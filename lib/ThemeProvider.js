'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _theme = require('../theme');

var _theme2 = _interopRequireDefault(_theme);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ThemeProvider = _react2.default.createClass({
  displayName: 'ThemeProvider',

  propTypes: {
    detectDevice: _react2.default.PropTypes.bool,
    autoUpdate: _react2.default.PropTypes.bool,
    expectStatusBar: _react2.default.PropTypes.bool
  },
  getDefaultProps: function getDefaultProps() {
    return {
      detectDevice: true,
      autoUpdate: true,
      expectStatusBar: true
    };
  },
  getInitialState: function getInitialState() {
    return {
      cordovaDeviceReady: false,
      cordovaPlatform: 'browser',
      mkappTheme: this.props.mkappTheme || new _theme2.default()
    };
  },
  componentWillMount: function componentWillMount() {
    var _this = this;

    document.addEventListener('deviceready', function () {
      var platform = global.device ? global.device.platform : "browser";
      var theme = _this.state.mkappTheme;
      if (_this.props.detectDevice) {
        theme.setOptions({ platform: platform });
      }
      _this.setState({
        cordovaDeviceReady: true,
        cordovaPlatform: platform,
        mkappTheme: theme
      });
    });
  },
  componentDidMount: function componentDidMount() {
    var _this2 = this;

    // ensure a re-render is triggered when mkappTheme is updated
    var theme = this.state.mkappTheme;
    theme.setOptions({ expectStatusBar: this.props.expectStatusBar });
    if (this.props.autoUpdate) {
      theme.on('update', function () {
        _this2.forceUpdate();
      });
    }
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var _this3 = this;

    // reset theme-update listener when new theme is passed via props
    var nextTheme = nextProps.nextTheme;

    var currentTheme = this.state.mkappTheme;
    if (nextTheme && nextTheme._id !== currentTheme._id) {
      // update the state theme with new theme passed from props
      if (this.state.cordovaDeviceReady) {
        if (this.props.detectDevice || nextProps.detectDevice) {
          nextTheme.setOptions({
            platform: this.state.cordovaPlatform,
            expectStatusBar: nextProps.expectStatusBar
          });
        }
      }
      currentTheme.removeAllListeners();
      if (this.props.autoUpdate || nextProps.autoUpdate) {
        nextTheme.on('update', function () {
          return _this3.forceUpdate();
        });
      }
      this.setState({ mkappTheme: nextTheme });
    } else {
      currentTheme.setOptions({
        expectStatusBar: nextProps.expectStatusBar
      });
    }
  },
  getChildContext: function getChildContext() {
    return {
      mkappTheme: this.state.mkappTheme,
      cordovaDeviceReady: this.state.cordovaDeviceReady,
      cordovaPlatform: this.state.cordovaPlatform
    };
  },

  childContextTypes: {
    mkappTheme: _react2.default.PropTypes.object.isRequired,
    cordovaDeviceReady: _react2.default.PropTypes.bool,
    cordovaPlatform: _react2.default.PropTypes.any
  },

  render: function render() {
    var props = (0, _lodash.merge)({}, this.props);
    delete props.mkappTheme;
    delete props.children;
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.Children.map(this.props.children, function (child) {
        return _react2.default.cloneElement(child, props);
      })
    );
  }
});

exports.default = ThemeProvider;