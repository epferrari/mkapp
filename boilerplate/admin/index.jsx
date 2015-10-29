if(process.env.NODE_ENV !== 'production'){
	window.LiveReloadOptions = { host: 'localhost' };
	require('livereload-js');
}

import React from 'react';
import App from './app.jsx';
