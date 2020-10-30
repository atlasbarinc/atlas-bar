import config from './config'

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: "@import" + config.stylesPath + "/global.scss";
      }
    }
  }
};