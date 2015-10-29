(function () {
    'use strict';

    angular
        .module('app.deposit')
        .config(stateProvider)
        .controller('DepositReviewController', DepositReviewController);

    stateProvider.$inject = ['$stateProvider'];
    DepositReviewController.$inject = ['accountsPromise', 'depositService', '$state', '$ionicHistory'];

    /* @ngInject */
    function stateProvider($stateProvider){
        $stateProvider
            .state('app.deposit-review', {
                cache: false,
                url: '/deposit/deposit-review',
                views: {
                    'menuContent': {
                        templateUrl: 'app/deposit/depositReview.html',
                        controller: 'DepositReviewController as vm',
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
    function DepositReviewController(accountsPromise, depositService, $state, $ionicHistory) {
        /* jshint validthis: true */
        var vm = this;


        vm.activate = activate;
        vm.accountChange = accountChange;
        vm.addCheck = addCheck;
        vm.completeDeposit = completeDeposit;
        vm.deleteCheck = deleteCheck;
        vm.retake = retake;
        vm.getChecksTotal = getChecksTotal;
        vm.cancelDeposit = depositService.cancelDeposit;
        vm.title = 'Deposit Review';
        vm.type = depositService.type;
        vm.mode = depositService.mode;
        vm.accounts = accountsPromise;
        vm.selectedAccount = depositService.account;
        vm.checks = depositService.checks;
        vm.checksTotalAmount = depositService.checksTotalAmount;
        vm.depositToEdit = depositService.depositToEdit;
        vm.mode = depositService.mode;

        activate();

        ////////////////

        //function runs when controller is activated
        function activate() {
            if(vm.mode === 'CREATE') {
                vm.getChecksTotal();
                depositService.checksTotalAmount = vm.checksTotalAmount;
            } else if(vm.mode === 'EDIT') {
                vm.selectedAccount = depositService.depositToEdit.account;
                vm.checks = depositService.depositToEdit.checks;
                vm.getChecksTotal();
                depositService.depositToEdit.checksTotalAmount = vm.checksTotalAmount;
            }
        }

        // calculate the amounts of checks in checks list and total them
        function getChecksTotal(){
            var total = 0;
            vm.checks.forEach(function (check) {
                total += check.checkAmount;
            });
            console.log('checks Total: ' + total);
            vm.checksTotalAmount = total;
        }

        // update depositService.account when selection changes in view
        function accountChange() {
            if(vm.mode === 'CREATE') {
                depositService.account = vm.selectedAccount;
            } else if(vm.mode === 'EDIT') {
                depositService.depositToEdit.account = vm.selectedAccount;
            }
            console.log(depositService);

        }

        //Delete check from checks list, then retotal checks amount total
        function deleteCheck(index) {
            if(vm.mode === 'CREATE') {
                depositService.checks.splice(index, 1);
                vm.getChecksTotal();
                depositService.checksTotalAmount = vm.checksTotalAmount;
            } else if(vm.mode === 'EDIT') {
                depositService.depositToEdit.checks.splice(index, 1);
                vm.getChecksTotal();
                depositService.depositToEdit.checksTotalAmount = vm.checksTotalAmount;
            }
            console.log (depositService);
        }

        //retake sends checkId to to capture-check view
        function retake(check, account) {
            $ionicHistory.clearCache();
            $state.go('app.capture-check', {hashKey: check.$$hashKey});
            depositService.account = account;
            depositService.checkAmount = check.checkAmount;
            depositService.checkFrontImage = check.checkFrontImage;
            depositService.checkBackImage = check.checkBackImage;
            console.log (depositService);
        }

        //changes state to app.check-capture
        function addCheck() {
            $ionicHistory.clearCache();
            $state.go('app.capture-check');
            console.log(depositService);
        }

        // completes deposit
        function completeDeposit() {
            $ionicHistory.clearCache();
            $state.go('app.deposit-completed');
            console.log (depositService);
        }

    }

})();