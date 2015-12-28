import React from 'react';
import iosView from '../ios/View';
import MaterialView from '../material/View';
import MkappThemeMixin from '../../theme/mixin';

var HybridView = React.createClass({
  mixins:[MkappThemeMixin],
  render(){
    let ViewComponent = this.context.mkappTheme.options.preferMaterial ? MaterialView : iosView;
    return <ViewComponent {...this.props}/>;
  }
});

module.exports = HybridView;
