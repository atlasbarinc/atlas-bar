# Widgets

The widgets directory contains one folder called vue. The directory is where you place your widgets. Here is how it works.

# Setup

CD into directory

```
cd widgets/vue
```

Set Node version to 11.15.0

```
nvm use 11.15.0
```

Install the depencies

```
yarn install
```

Run env watch script

```
yarn watch:dev
yarn watch:prod
```

# Structure

The directory contains sub folders for each widget, plus one folder called shared.

# Shared

This folder is where all shared components, mixins, scripts, etc should be placed.  They can be imported in any widget vue file using the alias `@shared`.

# Compiling

Any widget folder placed here will be compiled into a js file in the src/assets folder so long as it contains a root file named app.js that initializes component.

The output from the compilation will be a js and css file in the src/assets folder named after the directory.  For example the portal directory would result in two compiled assets files `portal.js` and `portal.css`.

# Liquid Integration

To make the app appear on a liquid page you need to create a custom HTML tag on that page, import the copmiled files from assets, and reference it in the app.js file of widget.  For example `<vue-portal>` could be placed on account, reference in `portal/app.js`.

