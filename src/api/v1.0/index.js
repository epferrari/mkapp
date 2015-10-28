import express from 'express';

var api = express();

api.get('/demo',(req,res) => {

	var data = [
		{
			id:'00001',
			name:"Demo Item One",
			data:[]
		},{
			id:'000002',
			name:"Demo Item Two",
			data:[]
		}
	];
	//res.send(JSON.stringify(data));
	res.send('Demo GET api/v1.0/demo')
});


export default api;
