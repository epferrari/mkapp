if(process.env.NODE_ENV !== 'production'){
	window.LiveReloadOptions = { host: 'localhost',port: 35728 };
	require('livereload-js');
}

import App from './app.jsx';
