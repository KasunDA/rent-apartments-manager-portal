angular.module('app.pages.users.userForm', [])
    .controller('UserFormController',
        function RoomFormController($scope, $timeout, $uibModalInstance, user, editMode, rooms, usersApiService) {
            $scope.editMode = editMode;
            if (user.room) {
                user.room_id = user.room.id.toString();
            }
            $scope.user = user;
            $scope.rooms = rooms;
            $scope.saveChanges = function () {
                var request = editMode ? usersApiService.editUser : usersApiService.createUser;

                request($scope.user).success(function (result) {
                    $uibModalInstance.close(true);
                }).error(function () {
                    //TODO Error
                    alert("Error");
                });
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        });