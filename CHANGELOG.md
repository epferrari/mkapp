# Changelog

## 0.8.0

### Breaking changes

- the `mkapp-cli` package is now required to run mkapp from the command line. Install with `npm install mkapp-cli -g`
- mkapp now expects javascript files to be in a `/js` directory rather than at the root of `public` or `admin`. Apps upgrading from 0.7.x can update with minimal refactoring. Just move app javascripts into `src/{admin|public}/js`. Also be sure to update any relative paths between those files and the `condux/{admin|public}` directories, and vice versa.
- mkapp now expects the entry javascript files to be called `src/{admin|public}/index.js` rather than `.jsx`, as there was no jsx in them. Apps upgrading from 0.7.x can update with minimal refactoring by changing the extensions from **.jsx** to .**.js** on these two files.
- mkapp now expects all .less files to be in the the `/less` directory rather than `/styles`. Apps upgrading from 0.7.x can update with minimal refactoring by changing the name of `src/{admin|public}/styles` to `src/{admin|public}/less`.
- mkapp now expects your main .less file to be named `main.less`, and will compile it to `<destination>/assets/css/main.css`. Apps upgrading from 0.7.x can update with minimal refactoring by changing the filename of `{admin|public}/styles/styles.less` to `{admin|public}/less/main.less`. Also be sure to update the paths in `src/{admin|public}/index.html` to `assets/css/main.css`.
- The **bootstrap** and **react-bootstrap** packages will no longer by included as default dependencies of mkapp. Apps upgrading from 0.7.x can update with minimal refactoring with `npm install bootstrap@3.3.5 react-bootstrap@0.27.3 --save`.

### Bug Fixes

- added `babel-polyfill` dependency for Safari and other browsers not implementing `Number.isInteger`
- `View` component now respects `style.paddingTop`, defaults to 0px
- TODO: fixing "ghosting" of the rollout menu items on quick consecutive menu openings

### New Features

- `NotifyBarTop` and `NotifyBarBottom` components added to library
- TODO: add prop to NavMenuItem to allow a custom function when it's triggered, rather than navigating to a view
- add font and image assets to `src/assets/{fonts|img}` to have them included in both admin and public apps' builds. Still use `src/{admin|public}/assets` directory for local assets. **Note:** Local assets will override assets of the same name at the global level.

### General Improvements

- configurations for source, dev, and dist directories in mkapp_config.json
- configuration option for whether to build an admin app
- upgraded to `condux-client` 0.4.2
- speed improvements to build scripts

### Misc

- by default, all overlay and drawer components except the curtain now render *without* a close button. Set `closeButton=true` to add one.
