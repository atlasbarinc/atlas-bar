# Styles

The styles directory follows an ITCSS/BEM approach. Below is breakdown of how this works.

# ITCSS Folders

The directory contains sub folders each with a purpose.

**General**
The `general` folder contains all resets, font imporst, and default element styles. This is usually set up at the beginngin of the project and then left alone.

**Objects**
The `objects` folder contains layout styles that have no lipstick (colors, fonts, etc). Think of these as structural styles. All classes in this folder must be prefixed with `o-`.  For example `o-container`.

**Settings**
The `settings` folder contains all style variables. These will be made available globally in components and other stylesheets. It is critical that this folder does not contain any classes, just variables.

**Tools**
The `tools` folder contains all style mixins. These will be made available globally in components and other stylesheets. It is critical that this folder does not contain any classes, just mixins.

**Utilities**
The `utilities` folder contains bite sized styles and overrides. These are the most powerful classes and can be used to trump other styles associated with an element. These work similar to tachyons and should not be abused. A good use case is for breakpoint specific visibility. All classes in this folder must be prefixed with `u-`.  For example `u-hideMobile`.

**Vendors**
The `vendors` folder contains all classes provided by thrid party libraries. Things like default carousel library styles should be imported here. Never write any of your own styles in this folder.

# ITCSS Files

The directory contains two important root level files.

**index.scss**
The `index.scss` file is used to create the app's global stylesheet. This file should import other folders `scss` files that are needed throughout site. Things like `general`, `objects`, `utilities`, `vendors`. Do not import variables or mixins here.

**global.scss**
The `global.scss` file is used to serve all global style variables and mixins. Do not import any style files that include classes.  You should only import `settings`, `tools` here. This file is also made globally available to all vue widgets components.

# Compiling

No files in the styles folder are compiled by webpack by default.  There are two reasons for this.  1).  Not every sass file needs to end up in the shopify assets folder.  2).  Webpack requires a js file to use as an entry point.

For all sass files you want compiled into assets, you need to import them into a JS file in the scripts folder.  For example, a file named `theme.js` inside scripts directory with this content would produce two assets files, `theme.js` and `theme.css`.

```
import '@styles/index.scss';
console.log('hello)
```