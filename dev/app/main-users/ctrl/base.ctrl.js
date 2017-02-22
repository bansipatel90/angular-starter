/**
 * @namespace act.Main
 */
define([
  'app/main-users/services/users.service'
  ], function() {

  angular
    .module('act.Main.Users')
    .controller('MainUsersBaseController', controller);

  controller.$inject = ['$state', 'logger', 'ToastService', 'UsersService'];

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
   * @param      {Object}  $state        ui-router state service
   * @param      {Object}  logger        act.log logger
   * @param      {Object}  ToastService  act.Services.ToastService
   * @param      {Object}  UsersService  act.Main.Users.UsersService
   */
  function controller($state, logger, ToastService, UsersService) {
    var ViewModel = this;

    ViewModel.query = {
      order: 'name',
      limit: 5,
      page: 1
    };
    ViewModel.selected = [];
    ViewModel.users = [];
    ViewModel.loadPromise = false;

    load();

    // ////////////////////////////////////////////////////

    function load() {
      var loadPromise = UsersService.get();
      ViewModel.loadPromise = loadPromise;

      loadPromise
        .then(function(res) {
          ViewModel.users = [
            {
              id: 1,
              firstName: 'Shoaib',
              lastName: 'Merchant',
              email: 'shoaib@actonate.com',
              role: 'Administrator',
            }
          ];
        })
        .catch(function(err) {
          ToastService.error(err.message);
        });
    };

  }

});

