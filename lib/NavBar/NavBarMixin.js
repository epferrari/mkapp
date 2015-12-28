'use strict';

var _lodash = require('lodash');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styleMerger = require('../../theme/utils/styleMerger');

var _styleMerger2 = _interopRequireDefault(_styleMerger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  getDefaultProps: function getDefaultProps() {
    return {
      onMenuButtonClick: function onMenuButtonClick() {}
    };
  },

  propTypes: {
    navbarColor: _react2.default.PropTypes.string,
    textColor: _react2.default.PropTypes.string,
    showMenuButton: _react2.default.PropTypes.bool,
    menuButtonLabel: _react2.default.PropTypes.string,
    menuButtonIconElement: _react2.default.PropTypes.element,
    onMenuButtonClick: _react2.default.PropTypes.func.isRequired,
    connectionStatus: _react2.default.PropTypes.oneOf([0, 1, 2]),
    title: _react2.default.PropTypes.string,
    showActivity: _react2.default.PropTypes.bool
  },
  prepareStyles: function prepareStyles() {
    // base styles
    var baseStyles = this.getBaseStyles();
    // theme styles
    var themeStyles_navbar = this.getThemeStyles('navBar');
    // props styles, override theme styles
    var propsStyles_navbar = {
      bgColor: this.props.navbarColor,
      textColor: this.props.textColor
    };

    // only use backgroundColor and color from theme and props, props override theme
    var okProps = ['backgroundColor', 'color'];
    var navbarStyles = (0, _lodash.pick)((0, _styleMerger2.default)(propsStyles_navbar, themeStyles_navbar), okProps);

    // render extra height for status bar?
    if ((0, _lodash.contains)([0, 1], this.props.connectionStatus)) {
      (0, _lodash.merge)(navbarStyles, {
        height: baseStyles.height + 6,
        maxHeight: baseStyles.height + 6
      });
    }

    // return rendering styles
    return {
      navbar: (0, _lodash.merge)({}, baseStyles, navbarStyles),
      navbar_statusBar: (0, _lodash.merge)({}, (0, _lodash.pick)(navbarStyles, 'backgroundColor', 'color'))
    };
  }
};