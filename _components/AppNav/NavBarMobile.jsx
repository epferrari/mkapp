import React
  from 'react';
import {merge,contains,pick}
  from 'lodash';
import MkappThemeMixin
	from '../../theme/mixin';
import MkappThemeStyleMerger
	from '../../theme/utils/styleMerger';
import MenuButtonRight
  from './MenuButtonRight';
import BackButton
  from './BackButton';
import ConnectionStatusBar
  from './ConnectionStatusBar';
import NavTitleCenter
  from './NavTitleCenter';
import ActivityStatus
  from './ActivityStatus';
import Row
  from '../gridsystem/Row';
import NavBarMixin
  from './NavBarMixin';

var NavBarMobile = React.createClass({
  mixins:[MkappThemeMixin,NavBarMixin],

  render(){
    var styles = this.prepareStyles();
    return(
      <Row style={styles.navbar}>
        <BackButton width={2}/>
        <ActivityStatus width={1} activity={this.props.showActivity} />
        <NavTitleCenter width={6} title={this.props.title} />
        <MenuButtonRight
          width={3}
          show={!this.props.showMenuButton}
          label={this.props.menuButtonLabel}
          iconElement={this.props.menuButtonIconElement}
          onClick={this.props.onMenuButtonClick}/>
        <ConnectionStatusBar status={this.props.connectionStatus} style={styles.navbar_statusBar}/>
      </Row>
    );
  },

  getBaseStyles(){
    let offsetTop = Number.isInteger(this.props.offsetTop) ? this.props.offsetTop : 0;
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

module.exports = NavBarMobile;
