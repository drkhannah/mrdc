(function () {
    'use strict';

    angular
        .module('app.layout')
        .config(stateProvider)
        .controller('Layout', Layout);

    stateProvider.$inject = ['$stateProvider', '$urlRouterProvider'];
    Layout.$inject = ['$state'];

    /* @ngInject */
    function stateProvider($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'app/layout/layout.html',
                controller: 'Layout as vm'
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/signin');
    }

    /* @ngInject */
    function Layout($state) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'KTT mRDC';
        vm.depositLink = 'DEPOSIT';
        vm.historyLink = 'HISTORY';
        vm.logoutLink = 'LOGOUT';

        activate();

        ////////////////

        function activate() {
            console.log($state.current)
        }

    }

})();