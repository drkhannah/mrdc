(function () {
    'use strict';

    angular
        .module('app')
        .run(appRun);

        appRun.$inject = ['$ionicPlatform', '$rootScope'];

        function appRun($ionicPlatform, $rootScope){
            $ionicPlatform.ready(function() {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                /*if (window.cordova && window.cordova.plugins.Keyboard) {
                  cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                  cordova.plugins.Keyboard.disableScroll(true);

                }*/

                if (window.StatusBar) {
                    // org.apache.cordova.statusbar required
                    StatusBar.styleDefault();
                }

                //listen for state change errors
                $rootScope.$on('$stateChangeError',
                    function(event, toState, toParams, fromState, fromParams, error){
                        console.log('STATE CHANGE ERROR: Event:' + angular.toJson(event) + ' toState:'
                            + angular.toJson(toState) + ' toParams:' + angular.toJson(toParams) + ' fromState:'
                            + angular.toJson(fromState) + ' fromParams:' + angular.toJson(fromParams) + ' Error:' + error);
                    });
            });
        }

})();

