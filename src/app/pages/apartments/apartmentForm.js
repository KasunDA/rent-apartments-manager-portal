angular.module('app.pages.apartments.apartmentForm', [])
    .controller('ApartmentFormController',
        function EditApartmentController($scope, $uibModalInstance, apartment, editMode, apartmentsApiService) {
            $scope.apartment = apartment;
            $scope.editMode = editMode;

            $scope.saveChanges = function () {
                var request = editMode ? apartmentsApiService.editApartment : apartmentsApiService.createApartment;

                request($scope.apartment).success(function (result) {
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