import React
	from 'react';

import {Row,Col}
	from 'react-bootstrap';

import {TextField}
	from 'material-ui';

import {merge}
	from 'lodash';


/*************************************/


var ListFilter = React.createClass({
	contextTypes: {
		appTheme: React.PropTypes.object.isRequired
	},
	propTypes: {
		onChange: React.PropTypes.func.isRequired,
		count: React.PropTypes.number,
		hintText: React.PropTypes.string
	},

	handleInputChange(){
		let filter = this.refs.filter.getValue();

		if(filter.length){
			filter = new RegExp(filter,"i");
		} else {
			filter = /.*/;
		}
		this.props.onChange(filter);
	},

	getStyles(){
		return {
			root: {
				position:"fixed",
				top:30,
				left:0,
				right:0,
				backgroundColor:"#000",
				zIndex:1,
				borderBottom: "1px solid rgba(70,70,70,0.5)"
			}
		};
	},

	render(){
		let styles = this.getStyles();
		let resultLabel = this.props.count ? this.props.count > 1 ? "Results" : "Result" : "Results";
		return (
			<div style={merge({},styles.root,this.props.style)}>
				<Row >
					<Col xs={12}>
						<TextField
							style={{paddingBottom:0,width:"100%"}}
							ref="filter"
							hintText={this.props.hintText}
							multiLine={true}
							underlineStyle={{ borderColor: "#fff" }}
							underlineFocusStyle={{ borderColor: "rgb(255,205,17)" }}
							onChange={this.handleInputChange}/>
					</Col>
				</Row>
				<Row style={{overflow: "visible",paddingBottom:2}}>
					<Col style={{
							fontSize: 12,
							marginTop:-8,
							textTransform: "capitalize"
						}} xs={12}>
						{this.props.count} {resultLabel}
					</Col>
				</Row>
			</div>
		);
	}
});

export default ListFilter;
