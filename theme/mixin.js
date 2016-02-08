var PropTypes = require('react').PropTypes;
var MkappTheme = require('../theme');

var ThemeMixin = {
	getThemeStyles: function getThemeStyles(component){
		if(this.props.useMkappTheme === true){
			var mkappTheme = this.context.mkappTheme || new MkappTheme();
			return mkappTheme.getComponentStyles(component) || {};
		} else {
			return {};
		}
	},
	getThemePalette: function getThemePalette(){
		var mkappTheme = this.context.mkappTheme || new MkappTheme();
		return mkappTheme.getPalette();
	},
	getThemeTypekit: function getThemeTypekit(){
		var mkappTheme = this.context.mkappTheme || new MkappTheme();
		return this.context.mkappTheme.getTypekit();
	},

	contextTypes:{
		mkappTheme: PropTypes.shape({
			getPalette: PropTypes.func,
			setPalette: PropTypes.func,
			getTypekit: PropTypes.func,
			setTypekit: PropTypes.func,
			getComponentStyles: PropTypes.func,
			setComponentStyles: PropTypes.func,
			setOptions: PropTypes.func
		})
	},
	getDefaultProps: function(){
		return {useMkappTheme: true};
	}
};

module.exports = ThemeMixin;
