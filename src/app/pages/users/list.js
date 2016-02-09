angular.module('app.pages.users.list', [])
    .config(function config($stateProvider) {
        $stateProvider.state('pages.usersList', {
            url: '/users',
            controller: 'UsersListController',
            templateUrl: 'pages/users/list.tpl.html',
            resolve: {
                users: function (usersApiService) {
                    return usersApiService.getAllUsers();
                },
                rooms: function (roomsApiService) {
                    return roomsApiService.getAllRooms();
                }
            },
            data: {
                pageTitle: 'Users',
                pageClass: 'users'
            }
        });
    })
    .controller('UsersListController',
        function UsersListController($scope, $timeout, users, $uibModal, rooms, usersApiService) {
            $scope.users = users.data;
            var refreshUsers = function() {
                usersApiService.getAllUsers().success(function(results) {
                    $scope.users = results;
                });
            };

            rooms.data.unshift({id: 0, name: 'None'});

            $scope.userForm = function(user) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'pages/users/userForm.tpl.html',
                    controller: 'UserFormController',
                    size: 'lg',
                    resolve: {
                        editMode: user ? true : false,
                        user: user ? user : {},
                        rooms: function() { return rooms.data; }
                    }
                });

                modalInstance.result.then(function (success) {
                    if (success) {
                        refreshUsers();
                    }
                });
            };

            $scope.removeUser = function(user) {
              usersApiService.removeUser(user.id).success(function() {
                 refreshUsers();
              }).error(function(err) {
                  alert(err);
              });
            };
        });