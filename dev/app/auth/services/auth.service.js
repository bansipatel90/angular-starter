define([
	'app-bootstrap'
	],function(){
	
	angular.module('act.Auth')
	.factory('AuthService', AuthService);
	
  AuthService.$inject = ['logger', 'Rest', '$q', 'SessionService'];
  
  function AuthService(logger, Rest, $q, SessionService) {
    	
  	var log = logger.log().child('AuthService');

  	return {
  		login: login,
  		logout: logout
  	};

   	/////////////////////////////////////////////////////////

    	/**
    	 * Login the user
    	 *
    	 * @public
    	 *
    	 * @memberof   act.Auth.AuthService
    	 *
    	 * @author     shoaibmerchant
    	 *
    	 * @param      {Object}  user    User credentials (username, password)
    	 * @return     {Object}  Promise
    	 */
    	function login(user) {
    	
    		var deferred = $q.defer();
  			var httpResource = Rest.resource('user').post('login');
  			 
  			var requestObject = {
  				username: user.username,
  				password: user.password
  			};

  			httpResource(requestObject)
	        .then(function(res) {		        
	          log.info('User logged in', res.data);

	          // set user logged in
	          SessionService.setLoggedIn(res.data);
	          deferred.resolve({code: 'SUCCESS', data: res.data});
	        })
	        .catch(function(err) {
	          log.error('Error logging in', err);
	          deferred.reject({code: 'ERROR', error: err, message: 'Error logging in'});
	        });

	      return deferred.promise;
    	}

    	/**
    	 * Logout the user
    	 *
    	 * @public
    	 *
    	 * @memberof   act.Auth.AuthService
    	 *
    	 * @author     manoj
    	 *
    	 * @return     {Object}  Promise
    	 */
    	function logout(){

        var deferred = $q.defer();

    		var httpResource = Rest.resource('user').post('logout');
  			httpResource('')
	        .then(function(res) {			        
	          log.info('User logged out', res.data);

	          // set user logged out
	          SessionService.setLoggedOut();

	          deferred.resolve({code: 'SUCCESS', data: res.data});
	        })
	        .catch(function(err) {
	          log.error('Error logging out', err);
	          deferred.reject({code: 'ERROR', error: err, message: 'Error logging out'});
	        });

		    return deferred.promise;
    	}

  	}
  }
);