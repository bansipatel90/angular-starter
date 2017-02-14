  /**
 * @namespace act.Base
 */
define([
  'app/auth/services/auth.service'
  ], function() {

  angular
    .module('act.Auth')
    .controller('AuthLoginController', controller);

  controller.$inject = ['logger', 'Rest', '$state', 'AuthService',
    'ToastService'];

  return controller;

  // //////////////////////////////////////////////////////

  /**
   * Login Controller
   *
   * @public
   *
   * @memberof   act.Auth
   *
   * @author     shoaibmerchant
   *
   * @param      {Object}  logger        act-log logger
   * @param      {Object}  Rest          act-rest REST Client
   * @param      {Object}  $state        ui-router
   * @param      {Object}  AuthService   act.Auth.AuthService
   * @param      {Object}  ToastService  act.Services.ToastService
   */
  function controller(logger, Rest, $state, AuthService, ToastService) {

    var ViewModel = this;
    var log = logger.log().child('AuthLoginController');
    
    ViewModel.user = {};
    ViewModel.loginUser = loginUser;
    

    // ///////////////////////////////////////////////////////

    /**
     * Send a test API call
     *
     * @public
     *
     * @memberof   act.Base.AppBaseController
     *
     * @author     shoaibmerchant
     */
    function loginUser() {
      var userCreds = ViewModel.user;

      ToastService.loading();

      AuthService.login(userCreds)
        .then(function(res) {
          ToastService.hide();
          $state.go('app.main.dashboard');
        })
        .catch(function(err) {
          ToastService.error(err.message);
          log.error('Error logging in from service', err);
        });
    }
  }

});
