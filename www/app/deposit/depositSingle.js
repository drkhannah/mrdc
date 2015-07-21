(function () {
    'use strict';

    angular
        .module('app.deposit')
        .config(stateProvider)
        .controller('DepositSingle', DepositSingle);

    stateProvider.$inject = ['$stateProvider'];
    DepositSingle.$inject = [];

    /* @ngInject */
    function stateProvider($stateProvider){
        $stateProvider
            .state('app.deposit-single', {
                url: '/deposit/depositSingleCheck',
                views: {
                    'menuContent': {
                        templateUrl: 'app/deposit/depositSingle.html',
                        controller: 'DepositSingle as vm'
                    }
                }
            })
    }

    /* @ngInject */
    function DepositSingle() {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'Deposit Single Check';
        vm.depositAmount = 0;

        activate();

        ////////////////

        function activate() {

        }
    }

})();