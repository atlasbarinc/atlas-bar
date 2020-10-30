const watch = require("node-watch");
const copyfiles = require("copyfiles");
const folders = [
  "assets",
  "config",
  "layout",
  "locales",
  "sections",
  "snippets",
  "templates",
  "templates/customers"
];

watch("src", { recursive: true }, function(evt, name) {
  let path = name.replace("src/", "");
  let pathArray = path.split("/");
  let folder = pathArray[0]
  if(path.startsWith("templates/customers")) {
    folder += "/" + pathArray[1]
  }
  if (folders.includes(folder)) {
    copyfiles([`src/${folder}/**`, `dist/${folder}`], true, () =>
      console.log(`copied ${folder}`)
    );
  }
});