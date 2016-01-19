angular.module('app.pages.about', [
        'ui.router'
    ])
    .config(function config($stateProvider) {
        $stateProvider.state('pages.about', {
            url: '/about',
            controller: 'AboutController',
            templateUrl: 'pages/about/about.tpl.html',
            resolve: {
            },
            data: {
                pageTitle: 'About',
                pageClass: 'about'
            }
        });
    })
    .controller('AboutController',
        function AboutController($scope) {
        });
