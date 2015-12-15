import React
	from 'react';
import {TextField}
	from 'material-ui';
import {merge}
	from 'lodash';
import typeOf
	from '@epferrari/js-utils/lib/typeOf';


/*************************************/
/* helpers */

var Row = React.createClass({
	getStyles(){
		return {
			width:'100%',
			display:'block',
			marginLeft:0,
			marginRight:0,
			paddingLeft:0,
			paddingRight:0,
			boxSizing: 'border-box'
		};
	},
	render(){
		return (<div {...this.props} style={merge({},this.getStyles(),this.props.style)}/>);
	}
});

var Col = React.createClass({
	getStyles(){
		let w = this.props.xs;
		w = (w && typeOf(w) === 'number') ? w : 12;
		return {
			width: w * 100 / 12 + '%',
			display: 'block',
			paddingLeft:15,
			paddingRight:15,
			minHeight:1,
			position:'relative',
			float:'left',
			boxSizing: 'border-box'
		};
	},
	render(){
		return (<div {...this.props} style={merge({},this.getStyles(),this.props.style)}/>);
	}
});


/*************************************/


var ListFilter = React.createClass({
	propTypes: {
		onChange: React.PropTypes.func.isRequired,
		count: React.PropTypes.number,
		hintText: React.PropTypes.string
	},
	handleInputChange(){
		let input = this.refs.input.getValue();
		let filter;
		if(input.length){
			filter = new RegExp(input,"i");
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
							ref="input"
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
