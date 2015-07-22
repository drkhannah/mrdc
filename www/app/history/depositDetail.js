(function () {
    'use strict';

    angular
        .module('app.history')
        .config(stateProvider)
        .controller('HistoryDetail', HistoryDetail);

    stateProvider.$inject = ['$stateProvider'];
    HistoryDetail.$inject = ['historyDetailPromise', '$ionicModal', '$scope'];

    /* @ngInject */
    function stateProvider($stateProvider){
        $stateProvider
            .state('app.history-detail', {
                url: '/history/:id',
                views: {
                    'menuContent': {
                        templateUrl: 'app/history/depositDetail.html',
                        controller: 'HistoryDetail as vm',
                        resolve: {
                            historyDetailPromise: function(historyService, $stateParams){
                                return historyService.historyDetail($stateParams.id)
                            }
                        }
                    }
                }
            })
    }

    /* @ngInject */
    function HistoryDetail(historyDetailPromise, $ionicModal, $scope) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'HistoryDetail';
        vm.id = historyDetailPromise[0].deposit.id;
        vm.account = historyDetailPromise[0].deposit.account;
        vm.depositAmount = historyDetailPromise[0].deposit.amount;
        vm.checks = historyDetailPromise[0].checks;
        // sample check object in checks array {"id": 1, "transID": "4841561518918615", "amount": "$500.00", "date": "5/25/15", "time": "3:16pm", "account": "xxxxxx5265" }

        //check images modal
        vm.closeImages = closeImages;
        vm.showImages = showImages;
        vm.checkIndex = null;

        activate();

        ////////////////

        function activate() {
            // Create the check images modal that we will use later
            $ionicModal.fromTemplateUrl('app/history/checkImages.html', {
                scope: $scope
            }).then(function(modal) {
                vm.modal = modal;
            });
        }

        // Triggered in the check images modal to close it
        function closeImages() {
            vm.modal.hide();
            screen.unlockOrientation();
        }

        // Open the check images modal
        function showImages(index) {
            vm.checkIndex = index;
            vm.modal.show();
            screen.lockOrientation('landscape');
        }

    }

})();