/**
 * @namespace act.Main
 */
define([
  'app/auth/services/auth.service'
  ], function() {

  angular
    .module('act.Main')
    .controller('MainBaseController', controller);

  controller.$inject = ['$state', '$mdSidenav', 'logger', 'AuthService', 'ToastService'];

  return controller;

  // //////////////////////////////////////////////////////

  /**
   * Main Base Controller
   *
   * @public
   *
   * @memberof   act.Main
   *
   * @author     shoaibmerchant
   *
   * @param      {Object}    $state        ui-router state service
   * @param      {Function}  $mdSidenav    Angular Material Sidenav
   * @param      {Object}    logger        act.log logger
   * @param      {Object}    AuthService   act.Auth.AuthService
   * @param      {Object}    ToastService  act.Services.ToastService
   */
  function controller($state, $mdSidenav, logger, AuthService, ToastService) {
    var ViewModel = this;
    var sideNavId = 'mainSidenav';

    ViewModel.toggleSidenav = toggleSidenav;
    ViewModel.logoutUser = logoutUser;
    
    // /////////////////////////////////////////////////////
    
    function toggleSidenav() {
      $mdSidenav(sideNavId).toggle();
    }

    function logoutUser() {
      ToastService.loading();

      AuthService.logout()
        .then(function(res) {
          ToastService.hide();
          $state.go('app.auth.login');
        })
        .catch(function(err) {
          ToastService.error(err.message);
        });
    }

  }

});

