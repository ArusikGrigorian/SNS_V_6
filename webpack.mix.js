const mix = require("laravel-mix");

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

mix
  .js("resources/js/app.js", "public/js")

  //api
  .js("resources/scripts/api/configs.js", "public/scripts/api")
  .js("resources/scripts/api/dataProcess.js", "public/scripts/api")
  .js("resources/scripts/api/request.js", "public/scripts/api")

  //common
  .js("resources/scripts/common/header.js", "public/scripts/common")

  //services
  .js("resources/scripts/services/resetPassword.js", "public/scripts/services")
  .js("resources/scripts/services/forgotPassword.js", "public/scripts/services")
  .js("resources/scripts/services/profile.js", "public/scripts/services")
  .js("resources/scripts/services/profileEdit.js", "public/scripts/services")
  .js("resources/scripts/services/menuEdit.js", "public/scripts/services")
  .js("resources/scripts/services/signIn.js", "public/scripts/services")
  .js("resources/scripts/services/signUp.js", "public/scripts/services")
  .js("resources/scripts/services/signOut.js", "public/scripts/services")

  //configurations
  .js("resources/scripts/configurations/constants.js", "public/scripts/configurations")

  //markup
  .js("resources/scripts/markup/error.js", "public/scripts/markup")
  .js("resources/scripts/markup/markup.js", "public/scripts/markup")
  .js("resources/scripts/markup/loader.js", "public/scripts/markup")
  .js("resources/scripts/markup/modal.js", "public/scripts/markup")

  // utils
  .js("resources/scripts/utils/helpers/toggleClass.js", "public/scripts/utils/helpers")
  .js("resources/scripts/utils/helpers/cuttingToken.js", "public/scripts/utils/helpers")
  .js("resources/scripts/utils/helpers/localStorage.js", "public/scripts/utils/helpers")
  .js("resources/scripts/utils/helpers/uploadImg.js", "public/scripts/utils/helpers")
  .js("resources/scripts/utils/helpers/dragDrop.js", "public/scripts/utils/helpers")

  .js("resources/scripts/utils/checkings/checkData.js", "public/scripts/utils/checkings")
  .js("resources/scripts/utils/checkings/checkForm.js", "public/scripts/utils/checkings")
  .js("resources/scripts/utils/checkings/comparePasswords.js", "public/scripts/utils/checkings")
  .js("resources/scripts/utils/checkings/checkInputs.js", "public/scripts/utils/checkings")
  .js("resources/scripts/utils/checkings/checkMenuLength.js", "public/scripts/utils/checkings")
  .js("resources/scripts/utils/cropperjs/cropper.min.js", "public/scripts/utils/cropperjs")

  .vue()
  .sass("resources/sass/app.scss", "public/css")
  .sass("resources/sass/components/header/header.scss", "public/css")
  .sass("resources/sass/media/media.scss", "public/css")
  .sass("resources/sass/reset/reset.scss", "public/css")
  .css("resources/scripts/utils/cropperjs/cropper.min.css", "public/css");
