'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Touchable = require('../Touchable');

var _Touchable2 = _interopRequireDefault(_Touchable);

var _Column = require('../gridsystem/Column');

var _Column2 = _interopRequireDefault(_Column);

var _MuiIcon = require('../MuiIcon');

var _MuiIcon2 = _interopRequireDefault(_MuiIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buttonStyles = {
  width: 40,
  cursor: "pointer",
  fontSize: 20,
  fontWeight: 100,
  paddingTop: 4,
  marginLeft: -10,
  marginTop: -2
};

var BackButton = _react2.default.createClass({
  displayName: 'BackButton',

  contextTypes: {
    location: _react2.default.PropTypes.object.isRequired,
    history: _react2.default.PropTypes.object.isRequired
  },
  propTypes: {
    width: _react2.default.PropTypes.number
  },
  getDefaultProps: function getDefaultProps() {
    return {
      width: 2
    };
  },
  render: function render() {
    var _this = this;

    if (this.context.location.pathname !== '/') {
      return _react2.default.createElement(
        _Column2.default,
        { width: this.props.width },
        _react2.default.createElement(
          _Touchable2.default,
          {
            component: 'div',
            style: buttonStyles,
            onClick: function onClick() {
              return _this.context.history.goBack();
            } },
          _react2.default.createElement(_MuiIcon2.default, { icon: 'arrow-back' })
        )
      );
    } else {
      return _react2.default.createElement(_Column2.default, { width: this.props.width });
    }
  }
});

module.exports = BackButton;