(function () {
    'use strict';

    angular
        .module('app.history')
        .config(stateProvider)
        .controller('History', History);

    stateProvider.$inject = ['$stateProvider'];
    History.$inject = ['historyPromise'];

    /* @ngInject */
    function stateProvider($stateProvider){
        $stateProvider
            .state('app.history', {
                url: '/history',
                views: {
                    'menuContent': {
                        templateUrl: 'app/history/history.html',
                        controller: 'History as vm',
                        resolve: {
                            historyPromise: function(historyService){
                                return historyService.loadHistory();
                            }
                        }
                    }
                }
            })
    }

    /* @ngInject */
    function History(historyPromise) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'History';
        vm.history = historyPromise[0].deposits;

        activate();

        ////////////////

        function activate() {

        }
    }

})();