'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactFaIcon = require('@epferrari/react-fa-icon');

var _reactFaIcon2 = _interopRequireDefault(_reactFaIcon);

var _Column = require('../gridsystem/Column');

var _Column2 = _interopRequireDefault(_Column);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ActivityStatus = _react2.default.createClass({
  displayName: 'ActivityStatus',

  propTypes: {
    activity: _react2.default.PropTypes.bool,
    width: _react2.default.PropTypes.number
  },
  getDefaultProps: function getDefaultProps() {
    return {
      activity: false,
      width: 1
    };
  },
  render: function render() {
    return _react2.default.createElement(
      _Column2.default,
      { width: this.props.width, style: { padding: 0, paddingTop: 4 } },
      this.props.activity && _react2.default.createElement(_reactFaIcon2.default, { icon: 'spinner', spin: true })
    );
  }
});

module.exports = ActivityStatus;