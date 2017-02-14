/**
 * @namespace Services
 */

define([
  'app-bootstrap',
  'app/base/ctrl/toast.ctrl'
], function() {

  angular
    .module('act.Services')
    .provider('ToastService', ToastServiceProvider);

  ToastServiceProvider.$inject = [];

  return ToastServiceProvider;

  /**
   * Generate Toast Notifications (Provider)
   *
   * @public
   *
   * @memberof   act.Base
   *
   * @author     shoaibmerchant
   *
   * @class
   * @return     {Object}  Provider instance of the service
   */
  function ToastServiceProvider() {

    ToastService.$inject = ['logger', '$mdMedia', '$mdToast', 'APP_BASE_PATH'];

    return {
      $get: ToastService
    };

    // ///////////////////////

    /**
     * Generate Toast Notifications (Service)
     *
     * @public
     *
     * @memberof   act.Base
     *
     * @author     shoaibmerchant
     *
     * @class
     * @param      {Object}    logger         act.log logging service
     * @param      {Function}  $mdMedia       Angular Material media query service
     * @param      {Object}    $mdToast       Angular Material toast service
     * @param      {string}    APP_BASE_PATH  App Base path
     * @return     {Object}    Service instance
     */
    function ToastService(logger, $mdMedia, $mdToast, APP_BASE_PATH) {

      var log = logger.log()
        .child('service')
        .child('ToastService');

      return {
        error: error,
        success: success,
        info: info,
        loading: loading,
        hide: hide,
      };

      // ///////////////////////

      /**
       * Create Toast Notification
       *
       * @private
       *
       * @memberof   act.Base.ToastService
       *
       * @author     shoaibmerchant
       *
       * @param      {!String}   message  Message to show in the toast
       * @param      {!String}   type     Type of message - error, info, success, loading
       * @param      {!Object}   options  Toast Configuration
       * @return     {!Boolean}  Acknolwedge
       */
      function _createToast(message, type, options) {

        var isMobileScreen = $mdMedia('xs') || $mdMedia('sm');

        // set options
        options = options || {};

        // set defaults for loading
        if (type === 'loading') {
          message = 'Loading...';
        }

        // set default container if inline
        if (options.inline) {
          options.container = options.container || '*[toast-box]';
        } else {
          delete options.container;
        }

        // set default positionning for container toast
        if (options.inline && !options.position) {
          options.position = 'bottom center';
        }

        // set center position
        if (options.position === 'bottom center') {
          options.position = 'bottom left right';
        } else if (options.position === 'top center') {
          options.position = 'top left right';
        }

        // Mobile device overrides
        if (isMobileScreen) {
          options.container = false;
          options.inline = false;
          options.position = 'bottom center';
        }

        var toastOptions = {
          templateUrl: APP_BASE_PATH + 'app/base/tpl/toast.tpl.html',
          controller: 'ToastController',
          controllerAs: 'ViewModel',
          bindToController: true,
          locals: {
            message: message,
            type: type,
            buttons: options.buttons || {},
            inline: options.inline
          },
          position: options.position || 'bottom right',
          hideDelay: !isNaN(options.timeout) ? options.timeout : 3500,
          parent: options.container || false
        };

        log.trace('Showing toast notification', toastOptions);
        return $mdToast.show(toastOptions);
      }

      /**
       * Hide the active toast
       *
       * @public
       *
       * @memberof   act.Base.ToastService
       *
       * @author     shoaibmerchant
       */
      function hide() {
        $mdToast.hide();
      }

      /**
       * Create error notification
       *
       * @public
       *
       * @memberof   act.Base.ToastService
       *
       * @author     shoaibmerchant
       *
       * @param      {!String}  message  Message to show in the toast
       * @param      {Object}   options  Additional parameters for the toast e.g. {timeout: 5000,
       *                                 inline: false, container: '{selector}', position: 'bottom
       *                                 right', closeButton: false}
       * @return     {Object}   Promise resolving to the toast
       */
      function error(message, options) {
        return _createToast(message, 'error', options);
      }

      /**
       * Create success notification
       *
       * @public
       *
       * @memberof   act.Base.ToastService
       *
       * @author     shoaibmerchant
       *
       * @param      {!String}  message  Message to show in the toast
       * @param      {Object}   options  Additional parameters for the toast e.g. {timeout: 5000,
       *                                 container: false, position: 'bottom right', closeButton:
       *                                 false}
       * @return     {Object}   Promise resolving to the toast
       */
      function success(message, options) {
        return _createToast(message, 'success', options);
      }

      /**
       * Create info notification
       *
       * @public
       *
       * @memberof   act.Base.ToastService
       *
       * @author     shoaibmerchant
       *
       * @param      {!String}  message  Message to show in the toast
       * @param      {Object}   options  Additional parameters for the toast e.g. {timeout: 5000,
       *                                 container: false, position: 'bottom right', closeButton:
       *                                 false}
       * @return     {Object}   Promise resolving to the toast
       */
      function info(message, options) {
        return _createToast(message, 'info', options);
      }

      /**
       * Create loading notification
       *
       * @public
       *
       * @memberof   act.Base.ToastService
       *
       * @author     shoaibmerchant
       *
       * @param      {!String}  message  Message to show in the toast
       * @param      {Object}   options  Additional parameters for the toast e.g. {timeout: 5000,
       *                                 container: false, position: 'bottom right', closeButton:
       *                                 false}
       * @return     {Object}   Promise resolving to the toast
       */
      function loading(message, options) {
        return _createToast(message, 'loading', options);
      }

    }
  }
});
