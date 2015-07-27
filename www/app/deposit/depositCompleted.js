(function () {
    'use strict';

    angular
        .module('app.deposit')
        .config(stateProvider)
        .controller('DepositCompleted', DepositCompleted);

    stateProvider.$inject = ['$stateProvider'];
    DepositCompleted.$inject = ['depositService', '$state', '$ionicHistory'];

    /* @ngInject */
    function stateProvider($stateProvider){
        $stateProvider
            .state('app.deposit-completed', {
                url: '/deposit/deposit-completed',
                views: {
                    'menuContent': {
                        templateUrl: 'app/deposit/depositCompleted.html',
                        controller: 'DepositCompleted as vm'
                    }
                }
            })
    }

    /* @ngInject */
    function DepositCompleted(depositService, $state, $ionicHistory) {
        /* jshint validthis: true */
        var vm = this;


        vm.activate = activate;
        vm.anotherDeposit = anotherDeposit;
        vm.title = 'Deposit Completed';


        activate();

        ////////////////

        function activate() {


        }

        function anotherDeposit() {

            $ionicHistory.nextViewOptions({
                disableBack: true
            });

            depositService.account = undefined;
            depositService.type = undefined;
            depositService.amount = undefined;
            depositService.checkAmount = undefined;
            depositService.checkFrontImage = undefined;
            depositService.checkBackImage = undefined;
            depositService.checks = [];
            depositService.checksTotal = undefined;
            $ionicHistory.clearCache();
            $state.go('app.deposit');
            console.log ('depositService Object: ' + angular.toJson(depositService));
        }

    }

})();