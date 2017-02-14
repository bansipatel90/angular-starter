  /**
 * @namespace act.Base
 */
define([
  'app/auth/services/auth.service'
  ], function() {

  angular
    .module('act.Auth')
    .controller('AuthLoginController', controller);

  controller.$inject = ['logger', 'Rest', '$state', 'AuthService'];

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
   * @param      {Object}  logger       act-log logger
   * @param      {Object}  Rest         act-rest REST Client
   * @param      {Object}  $state       ui-router
   * @param      {Object}  AuthService  act.Auth.AuthService
   */
  function controller(logger, Rest, $state, AuthService) {

    var ViewModel = this;
    var log = logger.log().child('AuthLoginController');
      
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
      var userCreds = ViewModel.userCredentials;

      AuthService.login(userCreds)
        .then(function(res) {
          $state.go('app.main.dashboard');
        })
        .catch(function(err) {
          log.error('Error logging in from service', err);
        });
    }
  }

});
