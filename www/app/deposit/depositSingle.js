(function () {
    'use strict';

    angular
        .module('app.deposit')
        .config(stateProvider)
        .controller('DepositSingle', DepositSingle);

    stateProvider.$inject = ['$stateProvider'];
    DepositSingle.$inject = ['accountsPromise'];

    /* @ngInject */
    function stateProvider($stateProvider){
        $stateProvider
            .state('app.deposit-single', {
                url: '/deposit/depositSingleCheck',
                views: {
                    'menuContent': {
                        templateUrl: 'app/deposit/depositSingle.html',
                        controller: 'DepositSingle as vm',
                        resolve: {
                            accountsPromise: function(depositService){
                                return depositService.loadAccounts();
                            }
                        }
                    }
                }
            })
    }

    /* @ngInject */
    function DepositSingle(accountsPromise) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'Deposit Single Check';
        vm.depositAmount = 0;
        vm.accounts = accountsPromise;
        vm.selectedAccount = "";
        vm.captureCheckFront = captureCheckFront;
        vm.checkFrontImage = null;

        activate();

        ////////////////

        function activate() {

        }

        function captureCheckFront(){
            //  navigator.splashscreen.hide(); Snap button method
            //    cordova.exec(null, null, "SplashScreen", "hide", []);
            cordova.exec(
                // Register the callback handler
                function callback(data) {
                    console.log('Original Image' + data.OriginalImage);
                    console.log('Original Image' + data.EncodedImage);
                    console.log('Original Image' + angular.toJson(data.ResultDictionary));

                    vm.checkFrontImage = data.EncodedImage;
                    /*document.getElementById('eI').style.backgroundImage = 'url("data:image/jpg;base64,'+data.EncodedImage+'")';
                    document.getElementById('oI').style.backgroundImage = 'url("data:image/jpg;base64,'+data.OriginalImage+'")';
                    document.getElementById('mibi').innerHTML = JSON.stringify(data.ResultDictionary);
                    document.getElementById('wrapper').style.display = "block"*/
                },
                // Register the errorHandler
                function errorHandler(err) {
                    alert('MiSnap is Cancelled');
                },
                // Define what class to route messages to
                'MiSnapPlugin',
                // Execute this method on the above class
                'cordovaCallMiSnap',
                //Arguments
                []);

        }
    }

})();