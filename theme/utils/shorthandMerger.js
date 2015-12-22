var merge = require('lodash').merge;

module.exports = function shorthandMerger(obj){
  obj = obj || {};
  var _obj = merge({},obj);
  var deletables = [
    'backgroundImage',
    'backgroundColor',
    'backgroundPosition',
    'backgroundRepeat',
    'backgroundSize',
    'bgColor',
    'bgImage',
    'bgPosition',
    'bgRepeat',
    'bgSize',
    'color',
    'textColor'
  ];
  deletables.forEach(function(prop){
    delete _obj[prop];
  });
  return merge(_obj,{
    backgroundImage: obj.backgroundImage || obj.bgImage,
    backgroundColor: obj.backgroundColor || obj.bgColor,
    backgroundPosition: obj.backgroundPosition || obj.bgPosition,
    backgroundSize: obj.backgroundSize || obj.bgSize,
    backgroundRepeat: obj.backgroundRepeat || obj.bgRepeat,
    color: obj.color || obj.textColor
  });
};
