angular.module('app.pages.signIn', [
        'ui.router'
    ])
    .config(function config($stateProvider) {
        $stateProvider.state('signIn', {
            url: '/signIn',
            controller: 'SignInController',
            templateUrl: 'pages/signIn/signIn.tpl.html',
            resolve: {},
            data: {
                pageTitle: 'Sign In',
                pageClass: 'signIn'
            }
        });
    })
    .controller('SignInController',
        function SignInController($rootScope, $scope) {
            $scope.signIn = function () {
                $rootScope.$broadcast('signedIn');
            };
        });
