import React from 'react';
import MkappThemeMixin from '../../theme/mixin';
import iosAppNav from '../ios/AppNav';
import MaterialAppNav from '../material/AppNav';

var HybridNav = React.createClass({
  mixins:[MkappThemeMixin],
  render(){
    let NavComponent = this.preferMaterialTheme() ? MaterialAppNav : iosAppNav;
    return <NavComponent {...this.props}/>;
  }
});

module.exports = HybridNav;
