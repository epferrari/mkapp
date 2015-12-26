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

var Provider = _react2.default.createClass({
  displayName: 'Provider',
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
      theme._updateForDevice(platform);

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
    this.state.mkappTheme.on('update', function () {
      return _this2.forceUpdate();
    });
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var _this3 = this;

    // reset theme-update listener when new theme is passed via props
    var mkappTheme = nextProps.mkappTheme;

    var lastTheme = this.state.mkappTheme;
    if (mkappTheme && mkappTheme._id !== lastTheme._id) {
      if (this.state.cordovaDeviceReady) {
        mkappTheme._updateForDevice(this.state.cordovaPlatform);
      }
      lastTheme.removeAllListeners();
      mkappTheme.on('update', function () {
        return _this3.forceUpdate();
      });
      this.setState({ mkappTheme: mkappTheme });
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

exports.default = Provider;