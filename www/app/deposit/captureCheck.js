(function () {
    'use strict';

    angular
        .module('app.deposit')
        .config(stateProvider)
        .controller('CaptureCheckController', CaptureCheckController);

    stateProvider.$inject = ['$stateProvider'];
    CaptureCheckController.$inject = ['accountsPromise', 'depositService', '$state', '$ionicHistory', '$timeout', '$ionicPopup', '$stateParams'];

    /* @ngInject */
    function stateProvider($stateProvider){
        $stateProvider
            .state('app.capture-check', {
                cache: false,
                url: '/deposit/capture-check:id',
                views: {
                    'menuContent': {
                        templateUrl: 'app/deposit/catureCheck.html',
                        controller: 'CaptureCheckController as vm',
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
    function CaptureCheckController(accountsPromise, depositService, $state, $ionicHistory, $timeout, $ionicPopup, $stateParams) {
        /* jshint validthis: true */
        var vm = this;


        vm.activate = activate;
        vm.accountChange = accountChange;
        vm.miSnapCheckFront = miSnapCheckFront;
        vm.miSnapCheckBack = miSnapCheckBack;
        vm.submitCheck = submitCheck;
        //vm.depositAmountChange = depositAmountChange;
        vm.checkAmountChange = checkAmountChange;
        vm.cancelCheck = cancelCheck;
        vm.editCheckId = $stateParams.id;
        vm.cancelDeposit = depositService.cancelDeposit;
        vm.title = 'Capture Check';
        vm.type = depositService.type;
        vm.mode = depositService.mode;
        vm.amount = depositService.amount;
        vm.checkAmount = depositService.checkAmount;
        vm.accounts = accountsPromise;
        vm.selectedAccount = depositService.account;
        vm.checks = depositService.checks;
        vm.checkFrontImage = depositService.checkFrontImage;
        vm.checkBackImage = depositService.checkBackImage;
        vm.frontCheckLoading = false;
        vm.backCheckLoading = false;


        activate();

        ////////////////

        function activate() {
            if(vm.mode === 'EDIT'){
                vm.selectedAccount = depositService.depositToEdit.account;
            }

        }

        function accountChange() {
            if(vm.mode === 'CREATE') {
                depositService.account = vm.selectedAccount;
            } else if(vm.mode === 'EDIT'){
                depositService.depositToEdit.account = vm.selectedAccount;
            }
            console.log('depositService Object: ' + angular.toJson(depositService));
        }

        //function depositAmountChange() {
        //    if(vm.mode === 'CREATE') {
        //        depositService.amount = vm.amount;
        //    } else if(vm.mode === 'EDIT'){
        //        depositService.depositToEdit.amount = vm.amount;
        //    }
        //    console.log('depositService Object: ' + angular.toJson(depositService));
        //}

        function checkAmountChange() {
            if(vm.mode === 'CREATE') {
                depositService.checkAmount = vm.checkAmount;
            } else if(vm.mode === 'EDIT'){
                depositService.depositToEdit.checkAmount = vm.checkAmount;
            }
            console.log('depositService Object: ' + angular.toJson(depositService));
        }

        function miSnapCheckFront(){

            //if(cordova !== null){
            //vm.frontCheckLoading = true;
            //cordova.exec(
            //    // Register the callback handler
            //    function callback(data) {
            //        //console.log('original Image: ' + data.OriginalImage);
            //        //console.log('Encoded Image: ' + data.EncodedImage);
            //        //console.log('result dictionary: ' + angular.toJson(data.ResultDictionary));
            //        depositService.checkFrontImage = data.EncodedImage;
            //        vm.checkFrontImage = depositService.checkFrontImage;
            //        console.log('vm.checkfrontimage : ' + vm.checkFrontImage);
            //        console.log('depositService checkfrontimage : ' + depositService.checkFrontImage);
            //        vm.frontCheckLoading = false;
            //        $state.go($state.current, {}, {reload: true});
            //        console.log('after reload vm.checkfrontimage : ' + vm.checkFrontImage);
            //        console.log('after reload depositService checkfrontimage : ' + depositService.checkFrontImage);
            //    },
            //    // Register the errorHandler
            //    function errorHandler(err) {
            //        alert('MiSnap is Cancelled: ' + err);
            //    },
            //    // Define what class to route messages to
            //    'MiSnapPlugin',
            //    // Execute this method on the above class
            //    'cordovaCallMiSnap',
            //    //Arguments
            //    []);
            //} else {
            //    alert('You need to be on a device for this to work')
            //}

            vm.frontCheckLoading = true;
            $timeout(function() {
                vm.frontCheckLoading = false;
                depositService.checkFrontImage = accountsPromise[0].checkFrontImage;
                vm.checkFrontImage = depositService.checkFrontImage;
                console.log ('depositService Object: ' + angular.toJson(depositService));
            }, 3000);
        }

        function miSnapCheckBack(){
            vm.backCheckLoading = true;
            $timeout(function() {
                vm.backCheckLoading = false;
                depositService.checkBackImage = accountsPromise[0].checkBackImage;
                vm.checkBackImage = depositService.checkBackImage;
                console.log ('depositService Object: ' + angular.toJson(depositService));
            }, 3000);
        }

        function submitCheck() {
            $ionicHistory.clearCache();
            $state.go('app.deposit-review');

            if(vm.mode === 'CREATE') {
                depositService.checks.push({
                    "checkFrontImage": vm.checkFrontImage,
                    "checkBackImage": vm.checkBackImage,
                    "amount": vm.checkAmount
                });
            } else if(vm.mode === 'EDIT') {
                depositService.depositToEdit.checks.forEach(function (check) {
                    if(check.id === vm.editCheckId){
                        check.checkFrontImage = vm.checkFrontImage;
                        check.checkFrontImage = vm.checkFrontImage;
                        check.checkBackImage = vm.checkBackImage;
                        check.amount = vm.checkAmount;
                    }
                });


                depositService.depositToEdit.checks[vm.editCheckId] = {
                    "checkFrontImage": vm.checkFrontImage,
                    "checkBackImage": vm.checkBackImage,
                    "amount": vm.checkAmount
                }
            }
            depositService.checkFrontImage = null;
            depositService.checkBackImage = null;
            depositService.checkAmount = null;
            //depositService.account = null;
            console.log('depositService Object: ' + angular.toJson(depositService));
        }

        function cancelCheck() {
            $ionicPopup.show({
                title: "Dont Save Check",
                template: "Are you sure you don't want to save this check to your deposit?",
                buttons: [{
                    text: 'No',
                    type: 'button-stable',
                    onTap: function(e) {
                        // e.preventDefault() will stop the popup from closing when tapped.
                        //e.preventDefault();
                        return false;
                    }
                }, {
                    text: 'YES',
                    type: 'button-positive',
                    onTap: function(e) {
                        // Returning a value will cause the promise to resolve with the given value.
                        return true;
                    }
                }]
            }).then(function(res) {
                if(res) {
                    $ionicHistory.clearCache();
                    $state.go('app.deposit-review');
                    depositService.checkAmount = null;
                    depositService.checkFrontImage = null;
                    depositService.checkBackImage = null;
                    console.log('depositService Object: ' + angular.toJson(depositService));
                } else {
                    console.log("Don't Cancel Check Submition");
                }
            });
        }
    }

})();