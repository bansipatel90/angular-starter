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
  ])
    .config(NgMaterialConfig);

  // /////////////////////////////////////

  /*=====================================
  =            Config Blocks            =
  =====================================*/

  NgMaterialConfig.$inject = ['$mdThemingProvider'];

  /**
   * Set theme colors for Angular Material
   *
   * @public
   *
   * @memberof   act
   *
   * @author     shoaibmerchant
   *
   * @class      NgMaterialConfig
   * @param      {Object}  $mdThemingProvider  Angular Material Theming provider
   */
  function NgMaterialConfig($mdThemingProvider) {

    $mdThemingProvider.definePalette('appPrimaryPalette', {
      '50': 'E3F2FD',
      '100': 'BBDEFB',
      '200': '90CAF9',
      '300': '64B5F6',
      '400': '42A5F5',
      '500': '2196F3',
      '600': '1E88E5',
      '700': '1976D2',
      '800': '1565C0',
      '900': '0D47A1',
      'A100': '82B1FF',
      'A200': '448AFF',
      'A400': '2979FF',
      'A700': '2962FF',
      'contrastDefaultColor': 'light',
      'contrastLightColors': ['50', '100',
        '200', '300', '400', 'A100'
      ],
    });

    $mdThemingProvider.theme('default')
      .primaryPalette('appPrimaryPalette')
      .accentPalette('blue');

    $mdThemingProvider.theme('successTheme')
      .primaryPalette('green')
      .accentPalette('blue');
  }

  /*=====  End of Config Blocks  ======*/

});
