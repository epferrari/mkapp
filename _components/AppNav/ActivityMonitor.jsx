import React from 'react';
import FontIcon from '@epferrari/react-fa-icon';
import Column from '../utility/Column';

var ActivityMonitor = React.createClass({
  propTypes:{
    activity: React.PropTypes.bool
  },
  getDefaultProps(){
    return {activity: false};
  },
  render(){
    return (
			<Column width={1} style={{padding:0,paddingTop:4}}>
				{this.props.activity && <FontIcon icon="spinner" spin/>}
			</Column>
		);
  }
});

module.exports = ActivityMonitor;
