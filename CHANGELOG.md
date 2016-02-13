# Changelog

## 0.8.1

### Bug Fixes

- fixed error where a newly scaffolded project wouldn't have an assets directory at the react-bootstrap

### Deprecations

- `mkapp go` has been deprecated and will be removed for version 1.0. Use `mkapp dev` instead.

### Misc

- refactored paths and filenames in CLI directory to be more semantically accurate. No functionality changes

## 0.8.0

### Breaking changes

- the `mkapp-cli` package is now required to run mkapp from the command line. Install with `npm install mkapp-cli -g`
- mkapp now expects javascript files to be in a `/js` directory rather than at the root of `public` or `admin`. Apps upgrading from 0.7.x can update with minimal refactoring. Just move app javascripts into `src/{admin|public}/js`. Also be sure to update any relative paths between those files and the `condux/{admin|public}` directories, and vice versa.
- mkapp now expects the entry javascript files to be called `src/{admin|public}/index.js` rather than `.jsx`, as there was no jsx in them. Apps upgrading from 0.7.x can update with minimal refactoring by changing the extensions from **.jsx** to .**.js** on these two files.
- mkapp now expects all .less files to be in the the `/less` directory rather than `/styles`. Apps upgrading from 0.7.x can update with minimal refactoring by changing the name of `src/{admin|public}/styles` to `src/{admin|public}/less`.
- mkapp now expects your main .less file to be named `main.less`, and will compile it to `<destination>/assets/css/main.css`. Apps upgrading from 0.7.x can update with minimal refactoring by changing the filename of `{admin|public}/styles/styles.less` to `{admin|public}/less/main.less`. Also be sure to update the paths in `src/{admin|public}/index.html` to `assets/css/main.css`.
- The **bootstrap** and **react-bootstrap** packages will no longer by included as default dependencies of mkapp. Apps upgrading from 0.7.x can update with minimal refactoring with `npm install bootstrap@3.3.5 react-bootstrap@0.27.3 --save`.
- Overlay and its derivatives (Drawers, Curtains, NavMenu, and NotificationBars) lifecycle props have changed. `onExit` is now `didExit`, and two more lifecycle hook functions have been added, `didEnter` and `willExit`.
Apps upgrading from 0.7.x can update with minimal refactoring by changing any `onExit` props to `didExit`. This will only affect local code, all components imported from `mkapp/lib/*` have already been updated to reflect the new props.

### Bug Fixes

- added `babel-polyfill` dependency for Safari and other browsers not implementing `Number.isInteger`
- `View` component now respects `style.paddingTop`, defaults to 0px
- fixed incorrect minHeight of View component
- fixed "ghosting" of the rollout menu items on quick consecutive menu openings

### New Features

- `NotifyBarTop` and `NotifyBarBottom` components added to library
- add `onSelection` prop to `NavMenuItem` to allow for a custom hook when it's triggered, rather than just navigating to a view. `onSelection` expects a function, which will be called with `props.path` as its only argument, or `null`. If a path is declared, it will be propagated back to the AppNav component to attempt a route, so if you're overriding the routing rather than just hooking it, omit **path** from props passed to NavMenuItem.
- add font and image assets to `src/assets/{fonts|img}` to have them included in both admin and public apps' builds. Still use `src/{admin|public}/assets` directory for local assets. **Note:** Local assets will override assets of the same name at the global level.

### General Improvements

- configurations for source, dev, and dist directories in mkapp_config.json
- configuration option for whether to build an admin app
- upgraded to `condux-client` 0.4.2
- Refactored `NavMenuItem`, `NavMenu`
- speed improvements to build scripts

### Misc

- by default, all overlay and drawer components except the curtain now render *without* a close button. Set `closeButton=true` to add one.
- UI changes in boilerplate

## 0.7.2

Do not use, upgrade to 0.8.0.
