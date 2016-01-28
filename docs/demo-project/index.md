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

Next `mkapp` will scaffold and install a boilerplate project in the *source* directory you specified in the configuration step. This will be the basis for our project.
Assuming you've cloned the project already, checkout a new branch pointing to our progress so far with `git checkout -b 1_setup 1_setup`.

### 2. The Boilerplate - What's Included

So you've got mkapp installed and configured, it's time to spin up the development environment. But before you do, let's browse through the `src` directory and see what's included in the project by default. Mkapp is built around the idea that your app should allow reactive, real-time communication between public client apps, admin apps, and the business logic on your server. It relies on websockets for this, but because we're using a reactive, uni-directional data-flow model, we don't directly code to the websocket API. Instead, we'll be using a library called [Condux](http://www.npmjs.org/package/condux). Condux, and its complementary client-side library [Condux-Client](https://www.npmjs.org/packag/condux-client), provide a way to send data from client to server datastores with actions, and react to updates from the server in real time via read-only streams called frequencies. If you're at all familiar with the flux pattern, Condux will quickly make sense. It's actually built around the popular flux-type library [reflux](https://www.npmjs.com/package/reflux). If you're not familiar with the flux pattern, [Facebook's flux documentation](https://facebook.github.io/flux/docs/overview.html) is a good place to start. The next chapter provides a deep dive into using Condux and Condux-Client, so for now just take note of its location in the directory structure.





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
