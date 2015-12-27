import React
  from 'react';
import {merge,contains,pick}
  from 'lodash';
import MkappThemeMixin
	from '../../theme/mixin';
import MkappThemeStyleMerger
	from '../../theme/utils/styleMerger';
import MenuButtonLeft
  from './MenuButtonLeft';
import ConnectionStatusBar
  from './ConnectionStatusBar';
import NavTitleLeft
  from './NavTitleLeft';
import ActivityStatus
  from './ActivityStatus';
import Row
  from '../gridsystem/Row';
import NavBarMixin
  from './NavBarMixin';


var NavBarMobileMaterial = React.createClass({
  mixins:[MkappThemeMixin,NavBarMixin],

  render(){
    var styles = this.prepareStyles();
    return(
      <Row style={styles.navbar}>
        <MenuButtonLeft
          width={3}
          show={!this.props.showMenuButton}
          label={this.props.menuButtonLabel}
          iconElement={this.props.menuButtonIconElement}
          onClick={this.props.onMenuButtonClick}/>
        <NavTitleLeft title={this.props.title} width={8}/>
        <ActivityStatus activity={this.props.showActivity} width={1}/>
        <ConnectionStatusBar status={this.props.connectionStatus} style={styles.navbar_statusBar}/>
      </Row>
    );
  },

  getBaseStyles(){
    let {offsetTop} = this.props;
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

module.exports = NavBarMobileMaterial;
