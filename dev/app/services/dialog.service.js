define([
  'app-bootstrap'
  ],function() {

  angular
      .module('act.Services')
      .factory('DialogService', DialogService);

  DialogService.$inject = ['$mdDialog', '$mdMedia', 'APP_BASE_PATH', 'logger'];
  
  function DialogService($mdDialog, $mdMedia, APP_BASE_PATH, logger) {

    var log = logger.log().child('DialogService');
    
    return {
        show: show,
        cancel: cancel
    };

    // //////////////////////////////////////////////////
    
    /**
     * Show Dialog box based on options
     *
     * @public
     *
     * @memberof   act.Services.DialogService
     *
     * @author     shoaibmerchant
     *
     * @param      {Object}  opts    The options with the format, the object structure is
     *                               {controllerPath: '', templatePath: '', options: { // override
     *                               defaults}}
     * @return     {Object}  Promise
     */
    function show(opts) {
      log.trace('Opening Dialog');

      var showFullScreen = false;

      if ($mdMedia('sm') || $mdMedia('xs')) {
        showFullScreen = true;
      }

      var dialogOptions = {
        controller: opts.controller,
        controllerAs: 'ViewModel',
        templateUrl: APP_BASE_PATH + opts.templatePath,
        parent: angular.element(document.body),
        clickOutsideToClose: true,
        fullscreen: showFullScreen
      };

      // override user specified options
      if (opts.options) {
        angular.extend(dialogOptions, opts.options);
      }

      var resolveOptions = {
        services: ['lazy',
          function(lazy) {
            return lazy.load(APP_BASE_PATH + opts.controllerPath);
          }
        ]
      }

      // override resolve
      if (opts.resolve) {
        angular.extend(resolveOptions, opts.resolve);
      }

      // include resolve options
      dialogOptions.resolve = resolveOptions;
      return $mdDialog.show(dialogOptions);
    }

    /**
     * Cancel the dialog and pass result (will reject dialog promise)
     *
     * @public
     *
     * @memberof   act.Services.DialogService
     *
     * @author     shoaibmerchant
     *
     * @param      {Object}  !res     Optional result (reject promise)
     */
    function cancel(res) {
      log.trace('Closing dialog', res);
      $mdDialog.cancel(res);
    }
  }
});

