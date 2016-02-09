angular.module('app.pages.apartments.roomForm', [])
    .controller('RoomFormController',
        function RoomFormController($scope, $uibModalInstance, room, editMode, roomsApiService) {
            $scope.room = room;
            $scope.editMode = editMode;

            $scope.saveChanges = function () {
                var request = editMode ? roomsApiService.editRoom : roomsApiService.createRoom;

                request($scope.room).success(function (result) {
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