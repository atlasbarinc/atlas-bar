const yaml = require('js-yaml');
const fs = require('fs');
const browserSync = require("browser-sync");

try {
  const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));
  const env = config[config.mode]
  browserSync.init({
    proxy: `${env.store}?preview_theme_id=${env.theme_id}`,
    files: "browserUpdate.js",
    snippetOptions: {
      rule: {
          match: /<\/body>/i,
          fn: function (snippet, match) {
              return snippet + match;
          }
      }
    }
  });
} catch (e) {
  console.log(e);
}