(function () {
    'use strict';

    angular
        .module('app.deposit')
        .config(stateProvider)
        .controller('Deposit', Deposit);

        stateProvider.$inject = ['$stateProvider'];
        Deposit.$inject = ['depositService', '$state', '$ionicHistory'];

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
        function Deposit(depositService, $state, $ionicHistory) {
            /* jshint validthis: true */
            var vm = this;

            vm.activate = activate;
            vm.singleDeposit = singleDeposit;
            vm.multipleDeposit = multipleDeposit;
            vm.cancelDeposit = depositService.cancelDeposit;
            vm.title = 'Make Deposit';

            activate();

            ////////////////

            function activate() {

            }

            function singleDeposit(){
                depositService.type = 'SINGLE';
                console.log(depositService.type);
                $state.go('app.capture-check');
            }

            function multipleDeposit(){
                depositService.type = 'MULTIPLE';
                console.log(depositService.type);
                $ionicHistory.clearCache();
                $state.go('app.capture-check');
            }
        }

})();