(function () {
    'use strict';

    angular
        .module('app.deposit')
        .config(stateProvider)
        .controller('Deposit', Deposit);

        stateProvider.$inject = ['$stateProvider'];
    Deposit.$inject = [];

        /* @ngInject */
        function stateProvider($stateProvider){
            $stateProvider
                .state('app.deposit', {
                    url: '/deposit',
                    views: {
                        'menuContent': {
                            templateUrl: 'app/deposit/deposit.html',
                            controller: 'Deposit as vm'

                        }
                    }
                })
        }

        /* @ngInject */
        function Deposit() {
            /* jshint validthis: true */
            var vm = this;

            vm.activate = activate;
            vm.title = 'Make Deposit';

            activate();

            ////////////////

            function activate() {
            }


        }

})();