(function () {
    'use strict';

    angular
        .module('app.deposit')
        .config(stateProvider)
        .controller('Deposit', Deposit);

        stateProvider.$inject = ['$stateProvider'];
        Deposit.$inject = ['depositService', '$state'];

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
        function Deposit(depositService, $state) {
            /* jshint validthis: true */
            var vm = this;

            vm.activate = activate;
            vm.title = 'Make Deposit';
            vm.singleDeposit = singleDeposit;
            vm.multipleDeposit = multipleDeposit;

            activate();

            ////////////////

            function activate() {
            }

            function singleDeposit(){
                depositService.singleDeposit = true;
                console.log(depositService.singleDeposit);
                $state.go('app.capture-check');
            }

            function multipleDeposit(){
                depositService.singleDeposit = false;
                console.log(depositService.singleDeposit);
                $state.go('app.capture-check');
            }
        }

})();