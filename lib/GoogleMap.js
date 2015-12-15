'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _googleMaps = require('google-maps');

var _googleMaps2 = _interopRequireDefault(_googleMaps);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _materialUi = require('material-ui');

var _MuiIcon = require('./MuiIcon');

var _MuiIcon2 = _interopRequireDefault(_MuiIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapsApi = new _bluebird2.default(_googleMaps2.default.load);

var styles = {
	wrapper: {
		position: "relative",
		paddingBottom: "65.25%",
		paddingTop: "100%",
		height: 0,
		overflow: "scroll",
		margin: 0
	},
	iframe: {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		border: "none"
	}
};

var zoomLevels = [],
    n = 20;
while (n--) {
	zoomLevels.push(n);
}var GoogleMap = _react2.default.createClass({
	displayName: 'GoogleMap',

	propTypes: {
		zoom: _react2.default.PropTypes.oneOf(zoomLevels),
		center: _react2.default.PropTypes.shape({
			lat: _react2.default.PropTypes.number,
			lng: _react2.default.PropTypes.number
		}),
		locations: _react2.default.PropTypes.array,
		mapDidMount: _react2.default.PropTypes.func,
		onMarkerClick: _react2.default.PropTypes.func
	},

	getInitialState: function getInitialState() {
		return {
			mapMarkers: [],
			selectedLoc: {}
		};
	},
	getDefaultProps: function getDefaultProps() {
		return {
			locations: [],
			zoom: 8,
			center: {
				lat: 40.748,
				lng: -89.623
			}
		};
	},
	componentDidMount: function componentDidMount() {
		var _this = this;

		var canvas = this.refs.canvas;
		var mapOptions = (0, _lodash.merge)({}, this.props);
		delete mapOptions.locations;
		mapsApi.then(function (google) {
			_this.map = new google.maps.Map(canvas, mapOptions);
			if (_this.props.mapDidMount) _this.props.mapDidMount(_this.map, google);
			_this.addMarkers();
		});
	},
	setMapZoom: function setMapZoom(zoomLevel) {},
	onMapZoom: function onMapZoom(event) {},
	addMarkers: function addMarkers() {
		var _this2 = this;

		// return the promise that markers have been placed on map
		// stagger the animations by 200ms
		return _bluebird2.default.all(this.props.locations.map(function (loc, i) {
			if (loc.coords) {
				return new _bluebird2.default(function (resolve) {
					setTimeout(function () {
						_this2.dropPin(loc);
						resolve();
					}, i * 75 + Math.sqrt(2 * i));
				});
			}
		}));
	},
	triggerDialog: function triggerDialog() {
		var modal = this.refs.modal;
		modal.show();
	},
	dismissDialog: function dismissDialog() {
		var modal = this.refs.modal;
		modal.dismiss();
		this.setState({ selectedLoc: {} });
	},
	dropPin: function dropPin(location) {
		var _this3 = this;

		if (!location) return;

		mapsApi.then(function (google) {
			var map = _this3.map;
			var markers = [];
			var coords = location.coords;
			var marker = new google.maps.Marker({
				position: coords,
				title: location.title,
				animation: google.maps.Animation[_this3.props.markerAnimation] || google.maps.Animation.DROP,
				map: map
			});

			google.maps.event.addListener(marker, 'click', function () {
				if (_this3.props.onMarkerClick) {
					_this3.props.onMarkerClick(location);
				} else {
					_this3.triggerDialog();
				}
				if (_this3.isMounted()) _this3.setState({ selectedLoc: location });
			});

			_this3.setState({
				mapMarkers: markers
			});
		});
	},
	render: function render() {
		return _react2.default.createElement(
			'div',
			{ style: styles.wrapper },
			_react2.default.createElement('div', { style: styles.iframe, ref: 'canvas' }),
			_react2.default.createElement(
				_materialUi.Dialog,
				{
					ref: 'modal',
					modal: false },
				_react2.default.createElement(
					'span',
					{ onClick: this.dismissDialog, style: { position: "absolute", top: 8, right: 8 } },
					_react2.default.createElement(_MuiIcon2.default, { icon: 'close' })
				),
				_react2.default.createElement(
					'h3',
					{ style: { fontWeight: 200, fontSize: 18 } },
					this.state.selectedLoc.title
				),
				_react2.default.createElement(
					'p',
					{ style: { fontWeight: 200, fontSize: 14 } },
					this.state.selectedLoc.description
				)
			)
		);
	},
	componentWillUnmount: function componentWillUnmount() {
		this.removeMarkers();
	},
	removeMarkers: function removeMarkers() {
		var _this4 = this;

		_bluebird2.default.all(this.state.mapMarkers.map(function (marker) {
			marker.setMap(null);
			return _bluebird2.default.resolve();
		})).then(function () {
			if (_this4.isMounted()) _this4.setState({ markers: [] });
		});
	}
});

exports.default = GoogleMap;