import React
  from 'react';
import {merge,contains,pick}
  from 'lodash';
import MkappThemeMixin
	from '../../theme/mixin';
import MkappThemeStyleMerger
	from '../../theme/utils/styleMerger';
import Row
  from '../gridsystem/Row';
import NavBarMenuButtonLeft
  from '../NavBar/NavBarMenuButtonLeft';
import NavBarConnectionStatus
  from '../NavBar/NavBarConnectionStatus';
import NavBarTitleLeft
  from '../NavBar/NavBarTitleLeft';
import NavBarActivityStatus
  from '../NavBar/NavBarActivityStatus';
import NavBarMixin
  from '../NavBar/NavBarMixin';


var MaterialNavBar = React.createClass({
  mixins:[MkappThemeMixin,NavBarMixin],

  render(){
    var styles = this.prepareStyles();
    return(
      <Row style={styles.navbar}>
        <NavBarMenuButtonLeft
          width={3}
          show={!this.props.showMenuButton}
          label={this.props.menuButtonLabel}
          iconElement={this.props.menuButtonIconElement}
          onClick={this.props.onMenuButtonClick}/>
        <NavBarTitleLeft title={this.props.title} width={8}/>
        <NavBarActivityStatus activity={this.props.showActivity} width={1}/>
        <NavBarConnectionStatus status={this.props.connectionStatus} style={styles.navbar_statusBar}/>
      </Row>
    );
  },

  getBaseStyles(){
    let offsetTop = this.getThemeStyles('navBar').offsetTop || 0;
    return merge({},{
        backgroundColor: "rgb(0,0,0)",
        verticalAlign: 'middle',
        paddingTop: offsetTop + 15,
        minHeight: offsetTop + 60,
        height: offsetTop + 60,
        maxHeight: offsetTop + 60,
        fontSize: 20,
        textTransform:"uppercase",
        color:"#fff",
        fontWeight: 200,
        marginLeft: 0,
        marginRight: 0
    });
  }

});

module.exports = MaterialNavBar;
