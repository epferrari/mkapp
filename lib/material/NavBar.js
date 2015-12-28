'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _mixin = require('../../theme/mixin');

var _mixin2 = _interopRequireDefault(_mixin);

var _styleMerger = require('../../theme/utils/styleMerger');

var _styleMerger2 = _interopRequireDefault(_styleMerger);

var _Row = require('../gridsystem/Row');

var _Row2 = _interopRequireDefault(_Row);

var _NavBarMenuButtonLeft = require('../NavBar/NavBarMenuButtonLeft');

var _NavBarMenuButtonLeft2 = _interopRequireDefault(_NavBarMenuButtonLeft);

var _NavBarConnectionStatus = require('../NavBar/NavBarConnectionStatus');

var _NavBarConnectionStatus2 = _interopRequireDefault(_NavBarConnectionStatus);

var _NavBarTitleLeft = require('../NavBar/NavBarTitleLeft');

var _NavBarTitleLeft2 = _interopRequireDefault(_NavBarTitleLeft);

var _NavBarActivityStatus = require('../NavBar/NavBarActivityStatus');

var _NavBarActivityStatus2 = _interopRequireDefault(_NavBarActivityStatus);

var _NavBarMixin = require('../NavBar/NavBarMixin');

var _NavBarMixin2 = _interopRequireDefault(_NavBarMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MaterialNavBar = _react2.default.createClass({
  displayName: 'MaterialNavBar',

  mixins: [_mixin2.default, _NavBarMixin2.default],

  render: function render() {
    var styles = this.prepareStyles();
    return _react2.default.createElement(
      _Row2.default,
      { style: styles.navbar },
      _react2.default.createElement(_NavBarMenuButtonLeft2.default, {
        width: 3,
        show: !this.props.showMenuButton,
        label: this.props.menuButtonLabel,
        iconElement: this.props.menuButtonIconElement,
        onClick: this.props.onMenuButtonClick }),
      _react2.default.createElement(_NavBarTitleLeft2.default, { title: this.props.title, width: 8 }),
      _react2.default.createElement(_NavBarActivityStatus2.default, { activity: this.props.showActivity, width: 1 }),
      _react2.default.createElement(_NavBarConnectionStatus2.default, { status: this.props.connectionStatus, style: styles.navbar_statusBar })
    );
  },
  getBaseStyles: function getBaseStyles() {
    var offsetTop = this.getThemeStyles('navBar').offsetTop || 0;
    return (0, _lodash.merge)({}, {
      backgroundColor: "rgb(0,0,0)",
      verticalAlign: 'middle',
      paddingTop: offsetTop + 15,
      minHeight: offsetTop + 60,
      height: offsetTop + 60,
      maxHeight: offsetTop + 60,
      fontSize: 20,
      textTransform: "uppercase",
      color: "#fff",
      fontWeight: 200,
      marginLeft: 0,
      marginRight: 0
    });
  }
});

module.exports = MaterialNavBar;