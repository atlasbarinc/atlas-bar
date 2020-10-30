# Shopify Starter

Starter repository for Shopify theme development

## Features

- Nested folder structures
- PostCSS/ES6 processing
- Live reload w/ BrowserSync
- Vue widget integration

## Setup

Set Node version to 11.15.0

```
nvm use 11.15.0
```

Install the depencies

```
yarn install
```

Rename .config-sample.yml file to config.yml add replace with project settings

```
mode: development

development:
  password:[SHOPIFY_APP_PASSWORD]
  theme_id:[SHOPIFY_THEME_ID]
  store:[SHOPIFY_URL]
  timeout: 60s
  ignore_files:
    - config/settings_data.json

production:
  password:[SHOPIFY_APP_PASSWORD]
  theme_id:[SHOPIFY_THEME_ID]
  store:[SHOPIFY_URL]
  timeout: 60s
  ignore_files:
    - config/settings_data.json
```

If working from existing theme - download shopify files

```
yarn run download
```


If working from new theme - zip files then upload to shopify
```
yarn run zip
```

## ENV Scripts

To toggle your environment change the line of code at top of config.yml, then run the corresponding commands.

```
mode: development
```

```
yarn start:dev
yarn watch:dev
```

```
mode: production
```

```
yarn start:prod
yarn watch:prod
```

If your Shopify theme is up to date with you local project, run the watch command instead of start.

```
yarn watch:dev
```

## Notes

The repository can be used with a regular Themekit approach - adding styles/scripts directly to the base shopify folders (assets for example)But this approach defeats a lot of the repo's purpose. For details on how to use the advanced features check out the guides directory.

The webpack file contains a number of useful aliases for easier imports.  For example the styles, scripts folders can be imported with these aliases `@styles` `@scripts`.

## Gotchas

The browserUpdate.js file is used to trigger BrowserSync reloads. It should not be edited.