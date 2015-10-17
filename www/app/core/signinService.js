(function () {
    'use strict';

    angular
        .module('app.signin')
        .factory('signinService', signinService);

    signinService.$inject = ['$http', '$q'];

    /* @ngInject */
    function signinService($http, $q) {
        var service = {
            username: '',
            password: '',
            signin: signin
        };

        return service;

        ////////////////

        function signin() {
            var defer = $q.defer();
            $http.get('data/login.json')
                .success(function (data) {
                    defer.resolve(data);
                }).error(function(error){
                    console.log('historyDetail error: ' + error);
                });
            return defer.promise;
        }


    }

})();