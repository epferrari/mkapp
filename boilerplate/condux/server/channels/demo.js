import conduxServer from '../';
import adminActions from '../adminActions.js';

module.exports = conduxServer.createStore('/demo',{
	listenables: [adminActions],
	onACTION_A(payload){
    this.trigger("A was triggered");
	},
  onACTION_B(payload){
    this.trigger("D was triggered");
	},
  onACTION_C(payload){
    this.trigger("D was triggered");
	},
  onACTION_D(payload){
    this.trigger("D was triggered");
	}
});
