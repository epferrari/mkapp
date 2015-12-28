'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Row = require('../gridsystem/Row');

var _Row2 = _interopRequireDefault(_Row);

var _reactFaIcon = require('@epferrari/react-fa-icon');

var _reactFaIcon2 = _interopRequireDefault(_reactFaIcon);

var _MuiIcon = require('../MuiIcon');

var _MuiIcon2 = _interopRequireDefault(_MuiIcon);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rowStyles = {
  fontSize: 10,
  height: 6,
  maxHeight: 6,
  textTransform: "none",
  textAlign: "center",
  color: "#fff",
  backgroundColor: "rgb(0,0,0)",
  display: "table",
  width: "100%",
  verticalAlign: "middle"
};

var ConnectionStatusBar = _react2.default.createClass({
  displayName: 'ConnectionStatusBar',

  propTypes: {
    status: _react2.default.PropTypes.oneOf([0, 1, 2])
  },
  getDefaultProps: function getDefaultProps() {
    return { status: 2 };
  },
  render: function render() {
    var status = this.props.status;

    if (status === 0) {
      var styles = this.prepareStyles();
      return _react2.default.createElement(
        _Row2.default,
        { style: styles },
        _react2.default.createElement(
          'span',
          { style: { display: "table-cell" } },
          'Not Connected ',
          _react2.default.createElement(_MuiIcon2.default, { icon: 'warning' })
        )
      );
    } else if (status === 1) {
      var styles = this.prepareStyles();
      return _react2.default.createElement(
        _Row2.default,
        { style: styles },
        _react2.default.createElement(
          'span',
          { style: { display: "table-cell" } },
          'Connecting ',
          _react2.default.createElement(_reactFaIcon2.default, { icon: 'spinner', spin: true })
        )
      );
    } else {
      return null;
    }
  },
  prepareStyles: function prepareStyles() {
    return (0, _lodash.merge)({}, rowStyles, (0, _lodash.pick)(this.props.style, 'color', 'backgroundColor'));
  }
});

module.exports = ConnectionStatusBar;