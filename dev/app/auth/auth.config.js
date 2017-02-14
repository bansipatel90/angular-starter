/**
 * @namespace act.Auth
 */
define([
  'app-bootstrap'
], function() {

  angular
    .module('act.Auth')
    .config(RouterConfig)


  // /////////////////////////////////////

  /*=====================================
  =            Config Blocks            =
  =====================================*/

  RouterConfig.$inject = ['APP_BASE_PATH', '$stateProvider', 'lazyProvider'];

  /**
   * Configure the act.Auth module's routes
   *
   * @public
   *
   * @memberof   act.Auth
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

    var BASE_DIR_CTRL = APP_BASE_PATH + 'app/auth/ctrl/';
    var BASE_DIR_TPL = APP_BASE_PATH + 'app/auth/tpl/';

    lazyProvider.configure('act.Auth');

    $stateProvider
     .state('app.auth', {
        abstract: true,
        templateUrl: BASE_DIR_TPL + 'base.tpl.html',
        controller: 'AuthBaseController',
        controllerAs: 'ViewModel',
        resolve: {
          services: ['lazy',
            function(lazy) {
              return lazy.load(BASE_DIR_CTRL + 'base.ctrl.js');
            }
          ],
          session: ['SessionService', function(SessionService) {
            return SessionService.isNotLoggedInPromise();
          }]
        }
      }).
      state('app.auth.login', {
        url: '/',
        templateUrl: BASE_DIR_TPL + 'login.tpl.html',
        controller: 'AuthLoginController',
        controllerAs: 'ViewModel',
        resolve: {
          services: ['lazy', function(lazy) {
              return lazy.load(BASE_DIR_CTRL + 'login.ctrl.js');
          }]
        }
      });
  }
});
