
angular.module('app', [
        'ui.router',
        'app.pages'
    ])
    .config(function myAppConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
    })
    .controller('AppController', function AppCtrl($rootScope, $scope) {
        //App Controller
    });
