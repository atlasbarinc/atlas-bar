# STYLES FOLDER

## ITCSS

This folder follows the ITCSS approach - https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/

Feel free to add or remove folder as you see fit.

## GLOBAL

All settings/tools are imported into the global.scss file.  They should not contain any actual classes, just variables and mixins.  

This file is made available by webpack to all the other scss files.


## FRAMEWORKS

If you want to use tachyons or other frameworks they should be imported into the vendors folder.  

If these are needed globally across your site makes sure that css file is imported in theme.liquid.