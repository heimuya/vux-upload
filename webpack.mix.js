let mix = require('laravel-mix')

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.setResourceRoot('../')

mix.options({
  extractVueStyles: true,
  processCssUrls: true,
  uglify: {},
  purifyCss: false,
  postCss: [require('autoprefixer')],
  clearConsole: false
})

mix.js('example/app.js', 'dist/')
  .extract(['vue', 'axios'])
  .setPublicPath('dist')

if (mix.config.inProduction) {
  mix.version()
  mix.disableNotifications()
}