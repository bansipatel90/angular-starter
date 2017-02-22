/**
 * @namespace act.Base
 */
define([
 'app-bootstrap'
], function() {

  angular
    .module('act.Main.Users')
    .config(RouterConfig);


  // /////////////////////////////////////

  /*=====================================
  =            Config Blocks            =
  =====================================*/

  RouterConfig.$inject = ['APP_BASE_PATH', '$stateProvider', 'lazyProvider'];

  /**
   * Configure the act.Main module's routes
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

    var BASE_DIR_CTRL = APP_BASE_PATH + 'app/main-users/ctrl/';
    var BASE_DIR_TPL = APP_BASE_PATH + 'app/main-users/tpl/';

    lazyProvider.configure('act.Main.Users');

    $stateProvider
      .state('app.main.users', {
        url: '/users',
        templateUrl: BASE_DIR_TPL + 'base.tpl.html',
        controller: 'MainUsersBaseController',
        controllerAs: 'ViewModel',
        resolve: {
          services: ['lazy',
            function(lazy) {
              return lazy.load(BASE_DIR_CTRL + 'base.ctrl.js');
            }
          ],
          session: ['SessionService', function(SessionService) {
            return SessionService.isLoggedInPromise();
          }]
        }
      });
  }

});
