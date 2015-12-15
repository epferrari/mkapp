var PropTypes = require('react').PropTypes;


var ThemeMixin = {
  getThemeStyles: function getThemeStyles(component){
		if(this.context.mkappTheme){
			return this.context.mkappTheme.getComponentStyles(component) || {};
		} else {
			return {};
		}
	},
  getThemePalette: function getThemePalette(){
    if(this.context.mkappTheme){
      return this.context.mkappTheme.getPalette();
    }else{
      return {}
    }
  },
  getThemeTypekit: function getThemeTypekit(){
    if(this.context.mkappTheme){
      return this.context.mkappTheme.getTypekit();
    }else{
      return {};
    }
  },
  contextTypes:{
		mkappTheme: PropTypes.shape({
			getPalette: PropTypes.func,
			updatePalette: PropTypes.func,
			getTypekit: PropTypes.func,
			setTypekit: PropTypes.func,
			getComponentStyles: PropTypes.func,
			setComponentStyles: PropTypes.func
		})
	},
};

module.exports = ThemeMixin;