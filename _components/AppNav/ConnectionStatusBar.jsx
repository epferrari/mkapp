import React
  from 'react';
import Row
  from '../gridsystem/Row';
import FontIcon
  from '@epferrari/react-fa-icon';
import MuiIcon
  from '../MuiIcon';
import {merge,pick}
  from 'lodash';

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

var ConnectionStatusBar = React.createClass({
  propTypes:{
    status: React.PropTypes.oneOf([0,1,2])
  },
  getDefaultProps(){
    return {status: 2};
  },
  render(){
		let {status} = this.props;

		if(status === 0){
      let styles = this.prepareStyles();
			return (
				<Row style={styles}>
					<span style={{display:"table-cell"}}>Not Connected <MuiIcon icon="warning"/></span>
				</Row>
			);
		} else if(status === 1){
      let styles = this.prepareStyles();
			return (
				<Row style={styles}>
					<span style={{display:"table-cell"}}>Connecting <FontIcon icon="spinner" spin/></span>
				</Row>
			);
		} else{
			return null;
		}
  },
  prepareStyles(){
    return merge({},rowStyles,pick(this.props.style,'color','backgroundColor'));
  }
});

module.exports = ConnectionStatusBar;
