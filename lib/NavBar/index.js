'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _mixin = require('../../theme/mixin');

var _mixin2 = _interopRequireDefault(_mixin);

var _styleMerger = require('../../theme/utils/styleMerger');

var _styleMerger2 = _interopRequireDefault(_styleMerger);

var _NavBarMenuButtonRight = require('./NavBarMenuButtonRight');

var _NavBarMenuButtonRight2 = _interopRequireDefault(_NavBarMenuButtonRight);

var _NavBarBackButton = require('./NavBarBackButton');

var _NavBarBackButton2 = _interopRequireDefault(_NavBarBackButton);

var _NavBarConnectionStatus = require('./NavBarConnectionStatus');

var _NavBarConnectionStatus2 = _interopRequireDefault(_NavBarConnectionStatus);

var _NavBarTitleCenter = require('./NavBarTitleCenter');

var _NavBarTitleCenter2 = _interopRequireDefault(_NavBarTitleCenter);

var _NavBarActivityStatus = require('./NavBarActivityStatus');

var _NavBarActivityStatus2 = _interopRequireDefault(_NavBarActivityStatus);

var _NavBarMixin = require('./NavBarMixin');

var _NavBarMixin2 = _interopRequireDefault(_NavBarMixin);

var _Row = require('../gridsystem/Row');

var _Row2 = _interopRequireDefault(_Row);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NavBar = _react2.default.createClass({
  displayName: 'NavBar',

  mixins: [_mixin2.default, _NavBarMixin2.default],

  render: function render() {
    var styles = this.prepareStyles();
    return _react2.default.createElement(
      _Row2.default,
      { style: styles.navbar },
      _react2.default.createElement(_NavBarBackButton2.default, { width: 2 }),
      _react2.default.createElement(_NavBarActivityStatus2.default, { width: 1, activity: this.props.showActivity }),
      _react2.default.createElement(_NavBarTitleCenter2.default, { width: 6, title: this.props.title }),
      _react2.default.createElement(_NavBarMenuButtonRight2.default, {
        width: 3,
        show: !this.props.showMenuButton,
        label: this.props.menuButtonLabel,
        iconElement: this.props.menuButtonIconElement,
        onClick: this.props.onMenuButtonClick }),
      _react2.default.createElement(_NavBarConnectionStatus2.default, { status: this.props.connectionStatus, style: styles.navbar_statusBar })
    );
  },
  getBaseStyles: function getBaseStyles() {
    var offsetTop = this.getThemeStyles('navBar').offsetTop || 0;
    return (0, _lodash.merge)({}, {
      backgroundColor: "rgb(0,0,0)",
      verticalAlign: 'middle',
      paddingTop: offsetTop,
      minHeight: offsetTop + 30,
      height: offsetTop + 30,
      maxHeight: offsetTop + 30,
      fontSize: 14,
      textTransform: "uppercase",
      color: "#fff",
      fontWeight: 200,
      marginLeft: 0,
      marginRight: 0
    });
  }
});

module.exports = NavBar;