import React
  from 'react';
import {merge,contains,pick}
  from 'lodash';
import MkappThemeMixin
	from '../../theme/mixin';
import MkappThemeStyleMerger
	from '../../theme/utils/styleMerger';
import NavBarMenuButtonRight
  from './NavBarMenuButtonRight';
import NavBarBackButton
  from './NavBarBackButton';
import NavBarConnectionStatus
  from './NavBarConnectionStatus';
import NavBarTitleCenter
  from './NavBarTitleCenter';
import NavBarActivityStatus
  from './NavBarActivityStatus';
import NavBarMixin
  from './NavBarMixin';
import Row
  from '../gridsystem/Row';


var NavBar = React.createClass({
  mixins:[MkappThemeMixin,NavBarMixin],

  render(){
    var styles = this.prepareStyles();
    return(
      <Row style={styles.navbar}>
        <NavBarBackButton width={2}/>
        <NavBarActivityStatus width={1} activity={this.props.showActivity} />
        <NavBarTitleCenter width={6} title={this.props.title} />
        <NavBarMenuButtonRight
          width={3}
          show={!this.props.showMenuButton}
          label={this.props.menuButtonLabel}
          iconElement={this.props.menuButtonIconElement}
          onClick={this.props.onMenuButtonClick}/>
        <NavBarConnectionStatus status={this.props.connectionStatus} style={styles.navbar_statusBar}/>
      </Row>
    );
  },

  getBaseStyles(){
    let offsetTop = this.getThemeStyles('navBar').offsetTop || 0;
    return merge({},{
      backgroundColor: "rgb(0,0,0)",
      verticalAlign: 'middle',
      paddingTop: offsetTop,
      minHeight: (offsetTop + 30),
      height: (offsetTop + 30),
      maxHeight: (offsetTop + 30),
      fontSize: 14,
      textTransform:"uppercase",
      color:"#fff",
      fontWeight: 200,
      marginLeft: 0,
      marginRight: 0
    });
  }

});

module.exports = NavBar;
