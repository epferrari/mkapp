import React
  from 'react';
import Touchable
  from '../Touchable';
import Column
  from '../gridsystem/Column';
import MuiIcon
  from '../MuiIcon';

var buttonStyles = {
  width:40,
  cursor:"pointer",
  fontSize: 20,
  fontWeight: 100,
  paddingTop:4,
  marginLeft:-10,
  marginTop: -4
};

var BackButton = React.createClass({
  contextTypes:{
    location: React.PropTypes.object.isRequired,
    history: React.PropTypes.object.isRequired
  },
  propTypes:{
    width: React.PropTypes.number
  },
  getDefaultProps(){
    return {
      width: 2
    };
  },
  handleClick(e){
    this.context.history.goBack();
  },
  render(){
    if(this.context.location.pathname !== '/'){
			return (
				<Column width={this.props.width} >
					<Touchable
            component="div"
            style={buttonStyles}
            onClick={this.handleClick}>
						<MuiIcon icon="arrow-back"/>
					</Touchable>
				</Column>
			);
		}else{
			return <Column width={this.props.width}/>;
		}
  }
});

module.exports = BackButton;
