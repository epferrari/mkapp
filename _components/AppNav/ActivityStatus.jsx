import React from 'react';
import FontIcon from '@epferrari/react-fa-icon';
import Column from '../gridsystem/Column';

var ActivityStatus = React.createClass({
  propTypes:{
    activity: React.PropTypes.bool,
    width: React.PropTypes.number
  },
  getDefaultProps(){
    return {
      activity: false,
      width: 1
    };
  },
  render(){
    return (
			<Column width={this.props.width} style={{padding:0,paddingTop:4}}>
				{this.props.activity && <FontIcon icon="spinner" spin/>}
			</Column>
		);
  }
});

module.exports = ActivityStatus;
