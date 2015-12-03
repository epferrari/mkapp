# mkapp

## A CLI build tool for React + Condux

### Installation

`npm install mkapp`

optionally, to run local node binaries from the command line (not installing them globally), add this to your `.bashrc`

`export PATH=./node_modules/.bin:$PATH`


===

### Usage

#### Create a new app

`mkapp new`

- Scaffolds out a new app and copy boilerplate into your project.
- Make sure to run from your project root where __node_modules__ directory is located
- copies boilerplate project files from git repository into `./src`



#### Develop

`mkapp go`

- transpiles your public and server app into `dev/` using **babel**
- bundles your public app into `dev/public`
- bundles your admin dashboard app into `dev/admin`
- opens a browser window to `localhost:<port>/app`
- opens a browser window to `localhost:<port>/admin`
- starts your app's server listening to `<port>`
- starts a live reload server for `src/public` and reloads `localhost:<port>/app` when files change
- starts a live reload server for `src/admin` and reloads `localhost:<port>/admin` when files change
- starts a `nodemon` process to restart the server when api files, middleware files, or index.js are changed
- connects a reflux-nexus to the admin app and the public app

* **NOTE:** default port is 3030, override with `export PORT=<port>`. This will override your config.PORT as well, and flow down through the app


#### Build

`mkapp dist`

- transpiles your public and server app into `dist/` using **babel**
- bundles and minifies your public app into `dist/public`
- bundles your minifies admin dashboard app into `dist/admin`


===

### Scaffold

###### App root structure

	root/
	|-- package.json
	|-- .gitignore
	|-- .eslintrc
	|-- node_modules/
	|-- dist/ (compiled and compressed app files, tracked in git)
	|-- dev/ (compiled app files, not tracked in git)
	|-- mkapp_config.js
	|-- src/
		|-- server/
			|-- index.js
			|-- middleware/
			|-- api/
				|-- v1.0/
					|-- index.js
		|-- condux/
			|-- admin/
				|-- index.js
				|-- actions.js
				|-- constants.js
				|-- frequencies/
			|-- public/
				|-- index.js
				|-- actions.js
				|-- constants.js
				|-- frequencies/
			|-- server
				|-- index.js
				|-- adminAppActions.js
				|-- publicAppActions.js
				|-- channels/
		|-- public/
			* See Below *
		|-- admin/
			* See Below
		|-- modules/
			(code packages tightly coupled around a single concern with files for public, admin, and server)


###### /public and /admin directory structure

	/
	|-- index.html
	|-- actions/
		|-- index.js
	|-- assets/
		|-- img/
		|-- fonts/
			|-- Roboto fonts
			|-- Font-Awesome fonts
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
	|-- views/
		|-- Home.jsx		
