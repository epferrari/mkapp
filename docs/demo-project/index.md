# Example Project with mkapp

### Overview

In this tutorial we'll build a simple mkapp project that uses a color picker and some input fields to change the look and feel of our application dynamically.
By the end of the tutorial, you should have a fairly good understanding of mkapp components, themes, the Condux websocket API, and building your own components into mkapp.
Clone the code from the [demo project repo](https://github.com/epferrari/mkapp-demo.git) and follow along by checking out tags as we progress.

### 1. Setup

First, make sure `mkapp` is installed locally and `mkapp-cli` is installed globally so you can use the command line interface.

	npm install mkapp-cli -g
	npm install mkapp --save

Grab a cup of coffee, the local installation will take a few minutes. When it completes, start out by confirming you have the cli tools.

	which mkapp

This should be `path/to/your/global/node/installation/bin/mkapp`. Once confirmed, lets create a new project.

	mkapp new

The global `mkapp-cli` will look for a local copy of `mkapp` using Node's `resolve()` algorithm. Once it finds the local installation, you
will be prompted to define some configuration keys. They are as follows:

- **Source Directory:** where your project files live. The boilerplate project files will get copied here. Keep it at the root level.
- **Development Directory:** where source files are compiled/transpiled into browser-ready code. This is where your app will live as you develop, and where the livereload server will serve files from when you run `mkapp dev`.
- **Distribution Directory:** where the concatenated and minified files for your distribution app will be saved when you run `mkapp dist`
- **Host for Condux Server:** url for the websocket server that keeps your client/admin/and server apps connected in real time. Default is `localhost`
- **Host for API Server:** url where the API server can be reached. Default is `localhost`.
- **Port:** Port for the condux server and files. Default is 3030

Next `mkapp` will scaffold and install a boilerplate project in the Source directory you specified in the configuration. This will be the basis for our project.
Assuming you've cloned the project already, checkout a new branch pointing to our progress so far with `git checkout -b 1_setup 1_setup`.

### 2. What's Included

### 3. Introduction to Condux

### 4. App State Overview

### 5. Components

### 6. Compositing Components

### 7. Hybrid Components

### 8. Mkapp Theme

### 9. Adding the Color Picker

### 10. Setting Colors via actions and app state (flux pattern with reflux)

### 11. Setting Colors via the Theme (context.mkappTheme)

### 12. Setting Colors via routing actions (flux, lifecycle methods, & react-router)

### 13. Setting Colors over the wire (Condux and reflux)

### 14. Advanced Theming: Multiple themes

### 15. Advanced Theming: Using mkappTheme for your own components