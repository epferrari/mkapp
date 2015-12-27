import React
  from 'react';
import Touchable
  from '../Touchable';
import Column
  from '../utility/Column';
import FontIcon
  from '@epferrari/react-fa-icon';


var buttonStyles = {
  margin:0,
  padding:0,
  paddingTop:4,
  border:"none",
  background:"none",
  float:"left",
  paddingBottom:0
};

var MenuButtonLeft = React.createClass({
  propTypes: {
    show: React.PropTypes.bool,
    onClick: React.PropTypes.func.isRequired,
    label: React.PropTypes.string,
    iconElement: React.PropTypes.element
  },
  getDefaultProps(){
    return {
      show: true,
      iconElement: (<FontIcon icon="bars"/>)
    }
  },

  render(){
		if(this.props.show){
			return (
				<Touchable
					component={Column}
					width={1}
					onClick={(e) => {
						e.stopPropagation();
						/*this.showMenu();*/
            this.props.onClick(e);
					}}
					style={{paddingRight:8}}>
					<button style={buttonStyles}>
						{this.props.label} {this.props.iconElement}
					</button>
				</Touchable>
			);
		} else {
			return <Column width={1}/>;
		}
	},
});

module.exports = MenuButtonLeft;
