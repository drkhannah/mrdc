(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('historyService', historyService);

    historyService.$inject = ['$http', '$q'];

    /* @ngInject */
    function historyService($http, $q) {
        var service = {
            loadHistory : loadHistory,
            historyDetail: historyDetail
        };

        return service;

        ////////////////

        function loadHistory() {
            var defer = $q.defer();
            $http.get('https://itktt4.keybank.com/ktt/m/home/acceptDisclosure?action=deposits')
                .success(function (data) {
                    defer.resolve(data);
                })
                .error(function(error){
                    console.log('loadHistory() error: ' + error);
                });
            return defer.promise;
        }

        function historyDetail(id) {
            var defer = $q.defer();
            $http.get('https://itktt4.keybank.com/ktt/m/home/acceptDisclosure?action=deposit&id=' + id)
                .success(function (data) {
                    defer.resolve(data);
                }).error(function(error){
                    console.log('historyDetail error: ' + error);
                });
            return defer.promise;
        }
    }

})();