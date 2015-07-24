(function () {
    'use strict';

    angular
        .module('app.deposit')
        .config(stateProvider)
        .controller('DepositReview', DepositReview);

    stateProvider.$inject = ['$stateProvider'];
    DepositReview.$inject = ['accountsPromise', 'depositService'];

    /* @ngInject */
    function stateProvider($stateProvider){
        $stateProvider
            .state('app.deposit-review', {
                url: '/deposit/deposit-review',
                views: {
                    'menuContent': {
                        templateUrl: 'app/deposit/catureCheck.html',
                        controller: 'DepositReview as vm',
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
    function DepositReview(accountsPromise, depositService) {
        /* jshint validthis: true */
        var vm = this;


        vm.activate = activate;
        vm.title = 'Deposit Review';
        vm.depositAmount = depositService.depositAmount;
        vm.accounts = accountsPromise;
        vm.selectedAccount = "";
        vm.checkFrontImage = depositService.singleDeposit.checkFront;
        vm.checkBackImage =   depositService.singleDeposit.checkBack;
        activate();

        ////////////////

        function activate() {


        }

    }

})();