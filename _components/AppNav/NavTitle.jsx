import React
  from 'react';
import Column
  from '../utility/Column';

var NavTitle = React.createClass({
  propTypes:{
    title: React.PropTypes.string,
    maxLength: React.PropTypes.number,
    width: React.PropTypes.number,
    alignment: React.PropTypes.oneOf(['left','center']),
    capitalize: React.PropTypes.bool
  },
  getDefaultProps(){
    return {
      title: "",
      maxLength: 16,
      width: 6,
      alignment: 'center',
      capitalize: false
    };
  },
  trimTitle(){
		if(this.props.title.length > this.props.maxLength){
			return this.props.title.substring(0,this.props.maxLength) + "...";
		} else {
			return this.props.title;
		}
	},
  render(){
    let styles = this.getStyles();
    return (
			<Column width={this.props.width}>
				<div style={styles}>{this.trimTitle()}</div>
			</Column>
		);
  },
  getStyles(){
    return {
      paddingTop:4,
      textAlign: this.props.alignment,
      width:"100%",
      textTransform: this.props.capitalize ? "capitalize" : "none"
    };
  }
});

module.exports = NavTitle;
