# Scripts

The scripts directory allows you to tell webpack what files you want compiled using babel.

# Compiling

Any file placed in this directory, regardless of how deeply nested it is will be compiled.  The only exceptions are files starting with underscores, and files name index.js.  These files are ignored ass they are meant to be used for importing into other files.  For example the utils folder is setup to not be compiled.

To use a script in a snippet/section/layout, you use the standard Shopify apporach of importing assets.