# mkapp

## An opinionated command line build tool for React

### Installation

	npm install mkapp -g

===

### Usage

#### Create a new app

`mkapp new`

- Walks through installation of `mkapp` dependencies and boilerplate files to create a new project



#### Develop

`mkapp go`

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

* **NOTE:** default port is 3030, override with `export PORT=<port>`. This will override your config.PORT as well (in config.js), and flows down through the app


#### Build

`mkapp dist`

- **Not written yet**
- transpiles your client and server app into `dist/` using **babel**
- bundles and minifies your client app into `dist/client`
- bundles your minifies admin dashboard app into `dist/admin`


===

### Scaffold

###### App root structure

	root/
	|-- package.json
	|-- config.js
	|-- .gitignore
	|-- .eslintrc
	|-- node_modules/
	|-- dist/ (compiled and compressed app files, tracked in git)
	|-- dev/ (compiled app files, not tracked in git)
	|-- src/
		|-- config.js
		|-- server/
			|-- index.js
			|-- middleware/
			|-- api/
				|-- v1.0/
					|-- index.js			
		|-- client/
			* See Below *
		|-- admin/
			* See Below
		|-- modules/
			(code packages tightly coupled around a single concern with files for client, admin, and server)


###### /client and /admin directory structure

	/
	|-- index.html
	|-- index-dev.html
	|-- actions/
		|-- appActions.js
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
	|-- reflux-nexus/
		|-- client.js
		|-- actions.js
		|-- frequencies/
	|-- views/
		|-- Home.jsx		
