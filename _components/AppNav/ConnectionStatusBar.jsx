import React
  from 'react';
import Row
  from '../utility/Row';
import FontIcon
  from '@epferrari/react-fa-icon';
import MuiIcon
  from '../MuiIcon';


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
			return (
				<Row style={rowStyles}>
					<span style={{display:"table-cell"}}>Not Connected <MuiIcon icon="warning"/></span>
				</Row>
			);
		} else if(status === 1){
			return (
				<Row style={rowStyles}>
					<span style={{display:"table-cell"}}>Connecting <FontIcon icon="spinner" spin/></span>
				</Row>
			);
		} else{
			return null;
		}
  }
});

module.exports = ConnectionStatusBar;
