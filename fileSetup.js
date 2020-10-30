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

folders.forEach(folder => {
  if (folder.includes("customers")) {
    if(folder === "template/customers") {
      copyfiles(
        [`src/${folder}/*`, `dist/${folder}/customers`],
        true,
        () => console.log(`copied ${folder}/customers`)
      );
    } else {
      copyfiles([`src/${folder}/**`, `dist/${folder}`], true, () =>
        console.log(`copied ${folder}`)
      );
    }
  } else {
    copyfiles([`src/${folder}/**`, `dist/${folder}`], true, () =>
      console.log(`copied ${folder}`)
    );
  }
});