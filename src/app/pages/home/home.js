angular.module('app.pages.home', [
        'ui.router',
        'app.api.testApiService'
    ])
    .config(function config($stateProvider) {
        $stateProvider.state('pages.home', {
            url: '/',
            controller: 'HomeController',
            templateUrl: 'pages/home/home.tpl.html',
            resolve: {},
            data: {
                pageTitle: 'Home',
                pageClass: 'home'
            }
        });
    })
    .controller('HomeController',
        function HomeController($scope, $timeout, testApiService) {
            $scope.test = "Angular is working";

            $timeout(function () {
                testApiService.testApi()
                    .success(function (data) {
                        $scope.apiTest = data;
                    });
            }, 5000);

        });
