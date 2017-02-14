define([
  'app-bootstrap'
  ],function() {

  angular
      .module('act.Services')
      .factory('SessionService', SessionService);

  SessionService.$inject = ['logger', 'Rest', '$q'];
  
  function SessionService(logger, Rest, $q) {

    var log = logger.log().child('SessionService');
    var loggedIn = false;
    var loadPromise = false;
    var session = false;

    return {
        load : load,
        isLoggedInPromise: isLoggedInPromise,
        isNotLoggedInPromise: isNotLoggedInPromise,
        setLoggedIn: setLoggedIn,
        setLoggedOut: setLoggedOut,
        get: get
    };

    /**
     * { auth service function_description }
     *
     * @public
     *
     * @memberof   act.Services.AuthService
     *
     * @author     shoaibmerchant
     *
     * @return     {promises}  { promises return when after session check}
     */
    function load(){
        
        var deferred = $q.defer();
        var httpResource = Rest.resource('user').get('session');

        loadPromise = httpResource();
        // loadPromise = $q.reject(false);

        loadPromise
          .then(function(res) {
            log.info('session found');
            
            // set private members
            loggedIn = true;
            session = res;
            
            deferred.resolve({code: 'AUTHORIZED'});
          })
          .catch(function(err) {
            log.info('no session', err);
            loggedIn = false;
            deferred.resolve({code: 'UNAUTHORIZED'});
          })
          .finally(function() {
            loadPromise = false;
          });

         return deferred.promise;
    }

    /**
     * Returns a resolved promise if logged in
     *
     * @public
     *
     * @memberof   act.Services.AuthService
     *
     * @author     manoj
     */
    function isLoggedInPromise() {
      if (loadPromise) {
        var deferred = $q.defer();
        loadPromise
            .then(function(res) {
                deferred.resolve({code: 'AUTHORIZED'});
                log.info(res);
            })
            .catch(function(err) {
                deferred.reject({code: 'UNAUTHORIZED'});
                log.info(err);
            });
        return deferred.promise;
      } else {
        if (loggedIn) {
            return $q.resolve({code: 'AUTHORIZED'});
        } else {
            return $q.reject({code: 'UNAUTHORIZED'});
        }
      }
    }


    /**
     * Returns a resolved promise if NOT logged in
     *
     * @public
     *
     * @memberof   act.Services.SessionService
     *
     * @author     manoj
     */
    function isNotLoggedInPromise() {
      if (loadPromise) {
        var deferred = $q.defer();
        loadPromise
            .then(function(res) {
                deferred.reject({code: 'AUTHORIZED'});
                log.info(res);
            })
            .catch(function(err) {
                deferred.resolve({code: 'UNAUTHORIZED'});
                log.info(err);
            });
          return deferred.promise;
      } else {
        if (!loggedIn) {
            return $q.resolve({code: 'UNAUTHORIZED'});
        } else {
            return $q.reject({code: 'AUTHORIZED'});
        }
      }
    }

    function setLoggedIn(sessionData) {
      session = sessionData;
      loggedIn = true;
    }

    function setLoggedOut() {
      loggedIn = false;
    }


    function get(){
      return session;
    }

  }
});

