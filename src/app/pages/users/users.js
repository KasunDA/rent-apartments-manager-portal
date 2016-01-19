angular.module('app.pages.users', [
    'app.api.usersApiService',
    'app.pages.users.list',
    'app.pages.users.details'
]);

angular.module('app.pages.users.list', [])
    .config(function config($stateProvider) {
        $stateProvider.state('pages.usersList', {
            url: '/users',
            controller: 'UsersListController',
            templateUrl: 'pages/users/list.tpl.html',
            resolve: {
                users: function (usersApiService) {
                    return usersApiService.getAllUsers();
                }
            },
            data: {
                pageTitle: 'Users',
                pageClass: 'users'
            }
        });
    })
    .controller('UsersListController',
        function UsersListController($scope, $timeout, users) {
            $scope.users = users.data;
        });


angular.module('app.pages.users.details', [])
    .config(function config($stateProvider) {
        $stateProvider.state('pages.usersDetails', {
            url: '/users/:id',
            controller: 'UsersDetailsController',
            templateUrl: 'pages/users/details.tpl.html',
            resolve: {
                user: function (usersApiService, $stateParams) {
                    return usersApiService.getUserById($stateParams.id);
                }
            },
            data: {
                pageTitle: 'Users',
                pageClass: 'users'
            }
        });
    })
    .controller('UsersDetailsController',
        function UsersDetailsController($scope, user) {
            $scope.user = user.data;
        });
