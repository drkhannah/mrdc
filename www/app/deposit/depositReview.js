(function () {
    'use strict';

    angular
        .module('app.deposit')
        .config(stateProvider)
        .controller('DepositReview', DepositReview);

    stateProvider.$inject = ['$stateProvider'];
    DepositReview.$inject = ['accountsPromise', 'depositService', '$state', '$ionicHistory'];

    /* @ngInject */
    function stateProvider($stateProvider){
        $stateProvider
            .state('app.deposit-review', {
                url: '/deposit/deposit-review',
                views: {
                    'menuContent': {
                        templateUrl: 'app/deposit/depositReview.html',
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
    function DepositReview(accountsPromise, depositService, $state, $ionicHistory) {
        /* jshint validthis: true */
        var vm = this;


        vm.activate = activate;
        vm.accountChange = accountChange;
        vm.addCheck = addCheck;
        vm.completeDeposit = completeDeposit;
        vm.deleteCheck = deleteCheck;
        vm.retake = retake;
        vm.getTotal = getTotal;
        vm.depositAmountChange = depositAmountChange;
        vm.cancelDeposit = depositService.cancelDeposit;
        vm.title = 'Deposit Review';
        vm.depositType = depositService.type;
        vm.amount = depositService.amount;
        vm.accounts = accountsPromise;
        vm.selectedAccount = depositService.account;
        vm.checks = depositService.checks;
        vm.checksTotalAmount = depositService.checksTotalAmount;

        activate();

        ////////////////

        function activate() {
            vm.getTotal()
        }

        function getTotal(){
            var total = 0;
            for(var i = 0; i < vm.checks.length; i++){
                var check = vm.checks[i];
                total += check.amount;
            }
            console.log('checks Total: ' + total);
            vm.checksTotalAmount = total;
        }

        function accountChange() {
            depositService.account = vm.selectedAccount;
        }

        function deleteCheck(index) {
            depositService.checks.splice(index, 1);
            vm.getTotal()
            console.log ('depositService Object: ' + angular.toJson(depositService));
        }

        function retake(index) {
            depositService.checks.splice(index, 1);
            $ionicHistory.clearCache();
            $state.go('app.capture-check');
            console.log ('depositService Object: ' + angular.toJson(depositService));
        }

        function addCheck() {
            $ionicHistory.clearCache();
            $state.go('app.capture-check');
            console.log ('depositService Object: ' + angular.toJson(depositService));
        }

        function depositAmountChange() {
            vm.getTotal()
        }

        function completeDeposit() {
            $ionicHistory.clearCache();
            $state.go('app.deposit-completed');
            console.log ('depositService Object: ' + angular.toJson(depositService));
        }

    }

})();