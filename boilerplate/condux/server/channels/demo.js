import conduxServer from '../';
import adminActions from '../adminActions.js';

var log = [];

function createEntry(payload){
	return `${payload} was triggered at ${new Date().toLocaleTimeString()}`;
}

function updateLog(entry){
	log.push(entry);
	return entry;
}



module.exports = conduxServer.createStore('/demo',{
	listenables: [adminActions],
	hydrate(){
		return log;
	},
	onACTION_A(payload){
		let entry = createEntry(payload);
    this.trigger(updateLog(entry));
	},
  onACTION_B(payload){
		let entry = createEntry(payload);
    this.trigger(updateLog(entry));
	},
  onACTION_C(payload){
		let entry = createEntry(payload);
    this.trigger(updateLog(entry));
	},
  onACTION_D(payload){
		let entry = createEntry(payload);
    this.trigger(updateLog(entry));
	}
});
