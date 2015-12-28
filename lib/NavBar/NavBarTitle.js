'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Column = require('../gridsystem/Column');

var _Column2 = _interopRequireDefault(_Column);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NavTitle = _react2.default.createClass({
  displayName: 'NavTitle',

  propTypes: {
    title: _react2.default.PropTypes.string,
    maxLength: _react2.default.PropTypes.number,
    width: _react2.default.PropTypes.number,
    alignment: _react2.default.PropTypes.oneOf(['left', 'center']),
    capitalize: _react2.default.PropTypes.bool
  },
  getDefaultProps: function getDefaultProps() {
    return {
      title: "",
      maxLength: 16,
      width: 6,
      alignment: 'center',
      capitalize: false
    };
  },
  trimTitle: function trimTitle() {
    if (this.props.title.length > this.props.maxLength) {
      return this.props.title.substring(0, this.props.maxLength) + "...";
    } else {
      return this.props.title;
    }
  },
  render: function render() {
    var styles = this.getStyles();
    return _react2.default.createElement(
      _Column2.default,
      { width: this.props.width },
      _react2.default.createElement(
        'div',
        { style: styles },
        this.trimTitle()
      )
    );
  },
  getStyles: function getStyles() {
    return {
      paddingTop: 4,
      textAlign: this.props.alignment,
      width: "100%",
      textTransform: this.props.capitalize ? "capitalize" : "none"
    };
  }
});

module.exports = NavTitle;