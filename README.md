#mkapp

##An opinionated command line build tool for React

### Installation

	npm install mkapp
	sudo alias mkapp=node_modules/mkapp/bin/mkapp

===

### Usage

#### Create a new app

`mkapp new`

- Scaffolds out a new app and copy boilerplate into your project.
- Make sure to run from your project root where __node_modules__ directory is located


		
#### Develop

`mkapp go [port=3030]`

- transpiles your client and server app into `dev/` using **babel**
- bundles your client app into `dev/client`
- bundles your admin dashboard app into `dev/admin`
- opens a browser window to `localhost:<port>/app`
- opens a browser window to `localhost:<port>/admin`
- starts your app's server listening to `<port>`
- starts a live reload server for `src/client` and reloads `localhost:<port>/app` when files change
- starts a live reload server for `src/admin` and reloads `localhost:<port>/admin` when files change
- starts a `nodeamon` process to restart the server when api files, middleware files, or index.js are changed
- connects a reflux-nexus to the admin app and the client app

#### Build

`mkapp dist`

- transpiles your client and server app into `dist/` using **babel** 
- bundles and minifies your client app into `dist/client`
- bundles your minifies admin dashboard app into `dist/admin`


===

###Scaffold

###### App root structure

	root/
	|-- package.json
	|-- .gitignore
	|-- .eslintrc
	|-- node_modules/
	|-- dist/ (compiled and compressed app files, tracked in git)
	|-- dev/ (compiled app files, not tracked in git)
	|-- src/
		|-- index.js
		|-- api/
			|-- v1.0/
				|-- index.js			
		|-- client/
			* See Below *
		|-- admin/
			* See Below
		|-- middleware/
		|-- modules/
			(code packages around a single purpose with files for client, admin, and server)
		

###### /client and /admin directory structure

	/
	|-- index.html
	|-- index-dev.html
	|-- actions/
		|-- appActions.js
	|-- assets/
		|-- img/
		|-- fonts/
	|-- components/ (ex. ComponentA.jsx, ComponentB.jsx)
	|-- constants/
		|-- appConstants.js
	|-- contexts/
		|-- appContext.jsx
	|-- datastores/
		|-- AppState.js
	|-- styles/
		|-- styles.less
		|-- mkapp-theme.js
		|-- component-styles/ (ex. ComponentA.less, ComponentB.less)
		|-- lib/
			|-- fonts.less
			|-- global.less
			|-- material-ui-fonts.less
		|-- css-transition-groups/
	|-- reflux-nexus/
		|-- client.js
		|-- actions.js
		|-- frequencies/
	|-- views/
		|-- Home.jsx		
			
				
				
				
				
					
					
					
 

