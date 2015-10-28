import React from 'react';
import {merge} from 'lodash';
import GoogleMapsLoader from 'google-maps';
import Promise from 'bluebird';
import {Dialog} from 'material-ui';
import MuiIcon from './MuiIcon.jsx';

var mapsApi = new Promise(GoogleMapsLoader.load);

const styles = {
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

var zoomLevels = [],n = 20;
while(n--) zoomLevels.push(n);


var GoogleMap = React.createClass({

	propTypes: {
		zoom: React.PropTypes.oneOf(zoomLevels),
		center: React.PropTypes.shape({
			lat: React.PropTypes.number,
			lng: React.PropTypes.number
		}),
		locations: React.PropTypes.array,
		mapDidMount: React.PropTypes.func
	},

	getInitialState(){
		return {
			mapMarkers: [],
			selectedLoc: {}
		};
	},

	getDefaultProps(){
		return {
			locations: [],
			zoom: 8,
			center: {
				lat : 40.748,
				lng : -89.623
			}
		};
	},

	componentDidMount(){
		var canvas = React.findDOMNode(this.refs.canvas);
		var mapOptions = merge({},this.props);
		delete mapOptions.locations;
		mapsApi.then( (google) => {
			this.map = new google.maps.Map(canvas,mapOptions);
			if(this.props.mapDidMount) this.props.mapDidMount(this.map,google);
			this.addMarkers();
		});
	},

	setMapZoom(zoomLevel){},

	onMapZoom(event){},

	addMarkers(){
		// return the promise that markers have been placed on map
		// stagger the animations by 200ms
		return Promise.all(this.props.locations.map( (loc,i) => {
			if(loc.coords){
				return new Promise( resolve => {
					setTimeout(() => {
						this.dropPin(loc);
						resolve();
					},i * 75 + Math.sqrt(2 * i));
				});
			}
		}));
	},

	triggerDialog(){
		let modal = this.refs.modal;
		modal.show();
	},

	dismissDialog(){
		let modal = this.refs.modal;
		modal.dismiss();
		this.setState({selectedLoc: {}});
	},

	dropPin(location){
		if(!location) return;

		mapsApi.then( (google) => {
			var map = this.map;
			var markers = [];
			var coords = location.coords;
			var marker = new google.maps.Marker({
				position: coords,
				title: location.title,
				animation : google.maps.Animation[this.props.markerAnimation] || google.maps.Animation.DROP,
				map: map
			});

			google.maps.event.addListener(marker,'click',() => {
				this.triggerDialog();
				this.setState({selectedLoc: location});
			});

			this.setState({
				mapMarkers: markers
			});
		});
	},

	render(){
		return (
			<div style={styles.wrapper}>
				<div style={styles.iframe} ref="canvas" />
				<Dialog
					ref="modal"
					modal={false}>
						<span onClick={this.dismissDialog} style={{position:"absolute",top:8,right:8}}><MuiIcon icon="close"/></span>
						<h3 style={{fontWeight:200,fontSize:18}}>{this.state.selectedLoc.title}</h3>
						<p style={{fontWeight:200,fontSize:14}}>{this.state.selectedLoc.description}</p>
				</Dialog>
			</div>
		);
	},

	componentWillUnmount(){
		this.removeMarkers();
	},

	removeMarkers(){
		Promise.all(this.state.mapMarkers.map( marker => {
			marker.setMap(null);
			return Promise.resolve();
		}))
		.then( () => {
			if(this.isMounted()) this.setState({	markers: [] });
		});
	}
});

export default GoogleMap;
