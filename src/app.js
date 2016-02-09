angular.module('app', [
        'ui.router',
        'ngCookies',
        'app.pages',
        'angular-loading-bar'

    ])
    .constant("envConfig", {
        "baseApiUrl": "http://40.113.108.255:5000/"
        //"baseApiUrl": "http://localhost:5000/"
    })
    .config(function myAppConfig($urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
    })
    .run(function ($rootScope, $state, $stateParams, $location, $cookies) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.appName = "App name";

        //Authentication placeholder
        //var signInLocation = '/signIn';
        //var defaultLocation = '/';
        //var signInState = 'signIn';
        //$rootScope.isAuthenticated = $cookies.get('isAuthenticated') == 1;
        //var resolveAuthentication = function (event, toState, fromState) {
        //    //Replace with proper authentication methods
        //
        //    var isAuthenticated = $rootScope.isAuthenticated;
        //    if ((toState == signInState || toState == "") && isAuthenticated) {
        //        if (event) {
        //            event.preventDefault();
        //        } else if ($state.current.name == signInState) {
        //            $location.path(defaultLocation);
        //        }
        //    }
        //    if (!$rootScope.isAuthenticated) {
        //        if (toState != signInState) {
        //            if (event) {
        //                event.preventDefault();
        //            }
        //            $location.path(signInLocation);
        //        }
        //    }
        //};
        //
        //$rootScope.$on('$stateChangeStart', function (event, toState, toStateParams, fromState) {
        //    $rootScope.toState = toState;
        //    $rootScope.toStateParams = toStateParams;
        //    resolveAuthentication(event, toState.name, fromState.name);
        //});
        //$rootScope.$on('signedIn', function () {
        //    $rootScope.isAuthenticated = true;
        //    $cookies.put('isAuthenticated', 1);
        //    resolveAuthentication(null, "");
        //});
        //$rootScope.$on('signedOut', function () {
        //    $rootScope.isAuthenticated = false;
        //    $cookies.put('isAuthenticated', 0);
        //    resolveAuthentication(null, "");
        //});
        //resolveAuthentication(null, $state.current.name);
    })
    .controller('AppController', function AppCtrl($rootScope, $scope) {
        //App Controller
    });