define([
	'app-bootstrap'
],function(){
	
	angular.module('act.Main.Products')
	.factory('ProductsService', ProductsService);
	
  ProductsService.$inject = ['logger', 'Rest', '$q', '$timeout'];
  
  function ProductsService(logger, Rest, $q, $timeout) {
    var log = logger.log().child('ProductsService');

    return {
      get: get
    };


    

    /////////////////////////////////////////////////////////

    function get(options) {
    }  
  }
});