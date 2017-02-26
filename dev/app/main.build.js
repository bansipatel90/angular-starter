/**
 * @namespace act
 */
define([
  // Base Config & Req
  'app-bootstrap',

  // Modules Configs
  'app/base/base.config',
  'app/auth/auth.config',
  'app/main/main.config',
  'app/main-users/main-users.config',
  'app/main-products/main-products.config'
], function() {

  angular.module('act', [
    'act.Base',
    'act.Globals',

    // All V2 Modules
    'act.Auth',
    'act.Main',
    'act.Main.Users',
    'act.Main.Products',

    // All 3rd party modules
    'ngMaterial',
    'ngAnimate',
    'ngAria',
    'md.data.table'
  ]);

  // /////////////////////////////////////

  /*=====================================
  =            Config Blocks            =
  =====================================*/

  /*=====  End of Config Blocks  ======*/

});
