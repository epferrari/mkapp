var merge = require('lodash').merge;
var shorthandMerger = require('./shorthandMerger');

module.exports = function styleMerger(props,theme,defaults){
  var _propsStyles = shorthandMerger(props);
  var _themeStyles = shorthandMerger(theme);
  var _defaultStyles = shorthandMerger(defaults);
  return merge({},_defaultStyles,_themeStyles,_propsStyles);
};
