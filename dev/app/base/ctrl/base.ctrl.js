/**
 * @namespace act.Base
 */
define([], function() {

  angular
    .module('act.Base')
    .controller('BaseController', controller);

  controller.$inject = [];

  return controller;

  // //////////////////////////////////////////////////////

  /**
   * Application Base Controller (Lowest level of Scope)
   *
   * @public
   *
   * @memberof   act.Base
   *
   * @author     shoaibmerchant
   *
   */
  function controller() {

    // var ViewModel = this;

  }

});
