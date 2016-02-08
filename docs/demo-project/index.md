# Example Project with mkapp

### Overview

In this tutorial we'll build a simple mkapp project that uses a color picker and some input fields to change the look and feel of our application dynamically. The tutorial is broken into two sections. The first covers the mkapp build system, in the second we'll build the actual app. By the end of the tutorial, you should have a fairly good understanding of mkapp components, themes, the Condux websocket API, and building your own components into mkapp. Clone the code from the [demo project repo](https://github.com/epferrari/mkapp-demo.git) and follow along by checking out tags as we progress.

Part 1: Mkapp Basics

- [Setup](#setup)
- [Boilerplate](#boilerplate)
- [Condux](#condux)
- [App State](#app-state)
- [Mkapp Components](#mkapp-components)
- [Building on Mkapp Components](#compositing-components)
- [Hybrid Components](#hybrid-components)
- [Mkapp Theme](#mkapp-theme)
- [Configuration](#mkapp-config)

Part 2: Building the App






<a name="setup"></a>
### 1.1 Setup

First, make sure `mkapp` is installed locally and `mkapp-cli` is installed globally so you can use the command line interface.

	npm install mkapp-cli -g
	npm install mkapp --save

Grab a cup of coffee, the local installation will take a few minutes. When it completes, start out by confirming you have the cli tools.

	which mkapp

This should be `path/to/your/global/node/installation/bin/mkapp`. Once confirmed, lets create a new project.

	mkapp new

The global `mkapp-cli` will look for a local copy of `mkapp` using Node's `resolve()` algorithm. Once it finds the local installation, you
will be prompted to define some configuration keys. They are as follows:

- **Source Directory:** where your project files live. The boilerplate project files will get copied here. Keep it at the root level. `default=./src`
- **Development Directory:** where source files are compiled/transpiled into browser-ready code. This is where your app will live as you develop, and where the livereload server will serve files from when you run `mkapp dev`. `default=./dev`
- **Distribution Directory:** where the concatenated and minified files for your distribution app will be saved when you run `mkapp dist` `default=./dist`
- **Host for Condux Server:** url for the websocket server that keeps your client/admin/and server apps connected in real time. `default=localhost`
- **Host for API Server:** url where the API server can be reached. `default=localhost`
- **Port:** Port for the condux server and files. `default=3030`
- **Admin App** should mkapp boilerplate an admin dashboard as well as a client app? `default=true`
- **Minify CSS** should mkapp compress the CSS when you create a distribution bundle? `default=true`

Next `mkapp` will scaffold and install a boilerplate project in the *source* directory you specified in the configuration step. This will be the basis for our project.
Assuming you've cloned the project already, checkout a new branch pointing to our progress so far with `git checkout -b 1_setup 1_setup`.


<a name="boilerplate"></a>
### 1.2 The Boilerplate - What's Included

So you've got mkapp installed and configured, it's time to spin up the development environment. But before you do, let's browse through the `src` directory and see what's included in the project by default. **Mkapp makes some assumptions about your app's architecture**, namely that it will have 3 javascript-centric components: public client apps that consume and share content, an admin app that curates content for the client apps, and the business logic on your Node server. The directory structure reflects that, although mkapp does allow for omission of any of these parts via its [configuration file](#mkapp-config).

Mkapp is built around the idea that your app should allow reactive, real-time communication between components in its architecture.  It relies on websockets for this, using a uni-directional websocket implementation called Condux [see: Introduction to Condux](#condux). The next chapter provides a deep dive into using Condux, so for now just take note of its location in the directory structure.

In addition to Condux, you'll see directories for `admin`, `public`, and `server`. As mentioned, mkapp assumes you'll have a public-facing app, an administrator panel app to manage users and content in the public app, and a Node app on the server to take care of serving files, logging to a database, and synchronizing state between the public apps and the admin dashboard. If you aren't going to be building an admin app, just set `CREATE_ADMIN_APP` to false in your mkapp_config.json, and mkapp will ignore that part of the build.

#### `src/admin`

#### `src/assets`

Fonts and images you want to make available for both the public and admin apps.

- in .less files, refer to your fonts with `url(../fonts/your-font-name)`.
- in .jsx/.js files, refer to your fonts with `url(assets/fonts/your-font-name)`
- in .less files, refer to images with `url(../img/your-image-name)`
- in .jsx/.js files, refer to images with `src='assets/img/your-image-name' or url(assets/img/your-image-name)`

#### `src/public`

This is the client or public facing side of the architecture. It has 4 simple views, a navigation menu, and a single state store to that holds application state.

###### `/assets` - Fonts and images local to the public app

###### `js/actions/index.js` - Reflux actions that your components call and the state store listens to.

###### `js/components` - React Components local to the public app

- `AppView.jsx` a composite wrapper for mkapp's `HybridView` component that calls some actions, interacting with the app's state when it mounts. See also [compositing](#compositing-components) and [hybrid components](#hybrid-components)

###### `js/datastores/` - \*flux datastore for app state handling

- `AppState.js` A simple state store to hold local app state. The datastore is built with the popular flux-type library [reflux](https://www.npmjs.com/package/reflux).

###### `js/views` - fullscreen views, they're used as the `component` prop in React Router's `<Route>` components, and are composited using the `AppView` in **js/components**

###### `js/app.jsx` - the application's main file

###### `js/index.js` - Entry point, loads ES6 polyfill and checks environment before loading the rest of the app

###### `/less` - The application's less files (.less files)

- `/main.less` compiled to main.css. Import other less files here. While you can write less code here as well, best practice is to import it from another file in `/lib`
- `/lib` supplementary less files used globally in your application, import into `main.less`
- `/components` less files that style specific components should go here, import into `main.less` as needed
- `/react-css-transition-groups` named animation group stylesheets, import into `main.less` as needed






<a name="condux"></a>
### 1.3 Introduction to Condux

Although mkapp's architecture components communicate via websockets, we don't directly code to the websocket API because we want to stick to a uni-directional data-flow model. So instead, we'll be using a library called [Condux](http://www.npmjs.org/package/condux). Condux, and its complementary browser-side library [Condux-Client](https://www.npmjs.org/packag/condux-client), provide a way to send data from client to server datastores with actions, and react to updates from the server in real time via read-only streams called frequencies. If you've been using the flux pattern in your applications, Condux's workflow should come naturally. It's actually built around the popular flux-type library [reflux](https://www.npmjs.com/package/reflux). If you're not familiar with the flux pattern yet, [Facebook's flux documentation](https://facebook.github.io/flux/docs/overview.html) is a good place to start.

### 1.4 App State Overview

### 1.5 Components

### 1.6 Compositing Components

### 1.7 Hybrid Components

### 1.8 Mkapp Theme

### 1.9 Mkapp Config

### 2.1 Adding the Color Picker

### 2.2 Setting Colors via actions and app state (flux pattern with reflux)

### 2.3 Setting Colors via the Theme (context.mkappTheme)

### 2.4 Setting Colors via routing actions (flux, lifecycle methods, & react-router)

### 2.5 Setting Colors over the wire (Condux and reflux)

### 2.6 Advanced Theming: Multiple themes

### 2.7 Advanced Theming: Using mkappTheme for your own components
