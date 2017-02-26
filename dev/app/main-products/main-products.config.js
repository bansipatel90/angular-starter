/**
 * @namespace act.Products
 */
define([
 'app-bootstrap'
], function() {

  angular
    .module('act.Main.Products')
    .config(RouterConfig);


  // /////////////////////////////////////

  /*=====================================
  =            Config Blocks            =
  =====================================*/

  RouterConfig.$inject = ['APP_BASE_PATH', '$stateProvider', 'lazyProvider'];

  /**
   * Configure the act.Main.Products module's routes
   *
   * @public
   *
   * @memberof   act.Main
   *
   * @author     shoaibmerchant
   *
   * @class
   * @param      {String}  APP_BASE_PATH   App Base path
   * @param      {Object}  $stateProvider  ui-router's stateProvider which is used to create
   *                                       application states/routes
   * @param      {Object}  lazyProvider    Provider instance of act.lazy used to lazy load modules
   */
  function RouterConfig(APP_BASE_PATH, $stateProvider, lazyProvider) {

    var BASE_DIR_CTRL = APP_BASE_PATH + 'app/main-products/ctrl/';
    var BASE_DIR_TPL = APP_BASE_PATH + 'app/main-products/tpl/';

    lazyProvider.configure('act.Main.Products');

    $stateProvider
      .state('app.main.products', {
        url: '/products',
        templateUrl: BASE_DIR_TPL + 'base.tpl.html',
        controller: 'MainProductsBaseController',
        controllerAs: 'ViewModel',
        resolve: {
          services: ['lazy',
            function(lazy) {
              return lazy.load([
                BASE_DIR_CTRL + 'base.ctrl.js',
                'ng-file-upload'
              ]);
            }
          ]
        }
      });
  }
});
