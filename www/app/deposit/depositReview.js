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
        vm.depositAmountChange = depositAmountChange;
        vm.cancelDeposit = depositService.cancelDeposit;
        vm.title = 'Deposit Review';
        vm.type = depositService.type;
        vm.amount = depositService.amount;
        vm.mode = depositService.mode;
        vm.accounts = accountsPromise;
        vm.selectedAccount = depositService.account;
        vm.checks = depositService.checks;
        vm.checksTotalAmount = depositService.checksTotalAmount;
        vm.depositToEdit = depositService.depositToEdit;
        vm.mode = depositService.mode;

        activate();

        ////////////////

        function activate() {
            if(vm.mode === 'EDIT') {
                vm.amount = depositService.depositToEdit.amount;
                vm.selectedAccount = depositService.depositToEdit.account;
                vm.checks = depositService.depositToEdit.checks;
            }
            vm.getChecksTotal()
        }

        // calculate the amounts of checks in checks list and total them
        function getChecksTotal(){
            var total = 0;
            for(var i = 0; i < vm.checks.length; i++){
                var check = vm.checks[i];
                total += check.amount;
            }
            console.log('checks Total: ' + total);
            vm.checksTotalAmount = total;
        }

        function accountChange() {
            if(vm.mode === 'CREATE') {
                depositService.account = vm.selectedAccount;
            } else if(vm.mode === 'EDIT') {
                depositService.depositToEdit.account = vm.selectedAccount;
            }
            console.log('depositService Object: ' + angular.toJson(depositService));

        }

        function depositAmountChange() {
            vm.getChecksTotal();
            if(vm.mode === 'CREATE') {
                depositService.amount = vm.amount;
            } else if(vm.mode === 'CREATE') {
                depositService.depositToEdit.amount = vm.amount;
            }
            console.log('depositService Object: ' + angular.toJson(depositService));

        }

        //Delete check from checks list, then retotal checks amount total
        function deleteCheck(index) {
            if(vm.mode === 'CREATE') {
                depositService.checks.splice(index, 1);
            } else if(vm.mode === 'EDIT') {
                depositService.depositToEdit.checks.splice(index, 1);
            }
            vm.getChecksTotal();
            console.log ('depositService Object: ' + angular.toJson(depositService));
        }

        //retake image, deletes image from checks list, changes state to app.check-capture
        function retake(checkId, check) {
            if(vm.mode === 'CREATE') {
                depositService.checks.splice(checkId, 1);
            } else if(vm.mode === 'EDIT') {
                //depositService.depositToEdit.checks.splice(checkIndex, 1);
                depositService.checkFrontImage = check.checkFrontImage;
                depositService.checkBackImage = check.checkBackImage;
                depositService.checkAmount = check.amount;
            }
            vm.getChecksTotal();
            $ionicHistory.clearCache();
            $state.go('app.capture-check', {id: checkId});
            console.log ('depositService Object: ' + angular.toJson(depositService));
        }

        //changes state to app.check-capture
        function addCheck() {
            $ionicHistory.clearCache();
            $state.go('app.capture-check');
            console.log ('depositService Object: ' + angular.toJson(depositService));
        }

        // completes deposit
        function completeDeposit() {
            $ionicHistory.clearCache();
            $state.go('app.deposit-completed');
            console.log ('depositService Object: ' + angular.toJson(depositService));
        }

    }

})();