(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('depositService', depositService);

    depositService.$inject = ['$http', '$q', '$ionicHistory', '$state'];

    /* @ngInject */
    function depositService($http, $q, $ionicHistory, $state) {
        var service = {
            loadAccounts: loadAccounts,
            cancelDeposit: cancelDeposit,
            type: undefined,
            account: undefined,
            amount: undefined,
            checksTotalAmount: undefined,
            checkAmount: undefined,
            checkFrontImage: undefined,
            checkBackImage: undefined,
            checks: [],
            checksTotal: undefined
        };

        return service;

        ////////////////

        function loadAccounts() {
            var defer = $q.defer();
            $http.get('data/depositAccounts.json')
                .success(function(data){
                    defer.resolve(data);
                })
                .error(function (error) {
                    console.log('loadAccounts() error:' + error)
                });
            return defer.promise;
        }

        function cancelDeposit() {

            $ionicHistory.nextViewOptions({
                disableBack: true
            });

            service.account = undefined;
            service.type = undefined;
            service.amount = undefined;
            service.checkAmount = undefined;
            service.checkFrontImage = undefined;
            service.checkBackImage = undefined;
            service.checks = [];
            service.checksTotal = undefined;
            $ionicHistory.clearCache();
            $state.go('app.deposit');

            console.log ('depositService Object: ' + angular.toJson(service))
        }

    }
    
})();