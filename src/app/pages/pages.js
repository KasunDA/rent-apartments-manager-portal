angular.module('app.pages', [
        'app.pages.signIn',
        'app.pages.home',
        'app.pages.about',
        'app.pages.users',
        'app.pages.apartments',
        'app.pages.billTypes',
        'app.pages.rentCalculations',
        'ui.bootstrap'
    ])
    .config(function config($stateProvider) {
        $stateProvider.state('pages', {
            abstract: true,
            controller: 'PagesController',
            templateUrl: 'pages/layout.tpl.html',
            resolve: {
                isAuthenticated: function($rootScope) {
                    return $rootScope.isAuthenticated;
                }
            },
        });
    })
    .controller('PagesController',
        function PagesController($rootScope, $scope) {
            $scope.signOut = function() {
                $rootScope.$broadcast('signedOut');
            }
        });
