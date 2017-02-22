define([
	'app-bootstrap'
],function(){
	
	angular.module('act.Main.Users')
	.factory('UsersService', UsersService);
	
  UsersService.$inject = ['logger', 'Rest', '$q', '$timeout'];
  
  function UsersService(logger, Rest, $q, $timeout) {
    var log = logger.log().child('UsersService');

    return {
      get: get
    };

    /////////////////////////////////////////////////////////

    function get(options) {
      var deferred = $q.defer();

      var httpResource = Rest.resource('user').get('session');

      $timeout(function() {
        deferred.resolve({code: 'SUCCESS', data: []});
      }, 5000);

      // httpResource('')
      //   .then(function(res) {             
      //     log.info('Users loaded', res.data);

      //     deferred.resolve({code: 'SUCCESS', data: res.data});
      //   })
      //   .catch(function(err) {
      //     log.error('Error fetching users', err);
      //     deferred.reject({code: 'ERROR', error: err, message: 'Error loading users'});
      //   });

      return deferred.promise;
    }  
  }
});