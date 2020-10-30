module.exports = () => {
  return {
    plugins: [
      require('postcss-import'),
      require('postcss-flexbox'),
      require('lost'),
      require('postcss-will-change'),
      require('postcss-prefix-selector')({ 
        prefix: '.v-widget ',
        exclude: ['html', 'body'] 
      }),
      require('autoprefixer'),
      require('postcss-clean')({
        level: 2
      })
    ]
  }
};