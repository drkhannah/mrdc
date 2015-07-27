(function () {
    'use strict';

    angular
        .module('app.deposit')
        .config(stateProvider)
        .controller('CaptureCheck', CaptureCheck);

    stateProvider.$inject = ['$stateProvider'];
    CaptureCheck.$inject = ['accountsPromise', 'depositService', '$state', '$ionicHistory'];

    /* @ngInject */
    function stateProvider($stateProvider){
        $stateProvider
            .state('app.capture-check', {
                url: '/deposit/capture-check',
                views: {
                    'menuContent': {
                        templateUrl: 'app/deposit/catureCheck.html',
                        controller: 'CaptureCheck as vm',
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
    function CaptureCheck(accountsPromise, depositService, $state, $ionicHistory) {
        /* jshint validthis: true */
        var vm = this;


        vm.activate = activate;
        vm.accountChange = accountChange;
        vm.miSnapCheckFront = miSnapCheckFront;
        vm.miSnapCheckBack = miSnapCheckBack;
        vm.submitCheck = submitCheck;
        vm.cancelDeposit = depositService.cancelDeposit;
        vm.title = 'Capture Check';
        vm.amount = depositService.amount;
        vm.checkAmount = undefined;
        vm.accounts = accountsPromise;
        vm.selectedAccount = depositService.account;
        vm.checkFrontImage = depositService.checkFrontImage;
        vm.checkBackImage = depositService.checkBackImage;


        activate();

        ////////////////

        function activate() {

        }

        function accountChange() {
            depositService.account = vm.selectedAccount;
        }

        function miSnapCheckFront(){
            depositService.checkFrontImage = accountsPromise[0].checkFrontImage;
            vm.checkFrontImage = depositService.checkFrontImage;
            console.log ('depositService Object: ' + angular.toJson(depositService));
        }
        function miSnapCheckBack(){
            depositService.checkBackImage = accountsPromise[0].checkBackImage;
            vm.checkBackImage = depositService.checkBackImage;
            console.log ('depositService Object: ' + angular.toJson(depositService));
        }

        function submitCheck() {
            depositService.checks.push({ "checkFrontImage": vm.checkFrontImage, "checkBackImage": vm.checkBackImage, "amount": vm.checkAmount });
            depositService.amount = vm.amount;
            depositService.checkAmount = vm.checkAmount;
            depositService.checkFrontImage = undefined;
            depositService.checkBackImage = undefined;
            $ionicHistory.clearCache();
            $state.go('app.deposit-review');
            console.log ('depositService Object: ' + angular.toJson(depositService));
        }
    }

})();