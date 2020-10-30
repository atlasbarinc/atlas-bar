# SCRIPTS FOLDER

Everything that gets compiled by webpack needs to exist in this directory.

## JAVASCRIPT FILES

All javascript files in this directory will be compiled by webpack and dropped into assets folder using their same name.  In this example header.js will be dropped into assets as header.js.  

NOTE: Files starting with underscores will be ignored

## JAVASCRIPT PARTIALS

All javascript partials should be named with underscore to start.  They will be included in the compiled version of any file they are imported into.

Example: _headerChild.js will be compiled and dropped into the header.js bundle

## SCSS FILES

All scss files need to be imported into a javascript file so webpack can compile them.  Only one scss file should be imported in a javascript file.  It will extracted and compiled using same name as file it is imported into.  

Example: _header.scss will be header.scss because it is imported into header.js

##  PATTERNS

### GLOBAL ASSETS

Put them into a index.js or global.js file.  Then import them into all of you liquid layouts

### LAYOUT ASSETS

Put them into a layout.js file matching the liquid file name. For example checkout.js.







