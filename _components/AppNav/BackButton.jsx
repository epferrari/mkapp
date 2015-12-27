import React
  from 'react';
import Touchable
  from '../Touchable';
import Column
  from '../utility/Column';
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
  handleClick(e){
    this.context.history.goBack();
  },
  render(){
    if(this.context.location.pathname !== '/'){
			return (
				<Column width={2} >
					<Touchable
            component="div"
            style={buttonStyles}
            onClick={this.handleClick}>
						<MuiIcon icon="arrow-back"/>
					</Touchable>
				</Column>
			);
		}else{
			return <Column width={2}/>;
		}
  }
});

module.exports = BackButton;
