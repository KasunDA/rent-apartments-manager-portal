angular.module('app.pages.rentCalculations.rentCalculationForm', [])
    .controller('RentCalculationFormController',
        function RoomFormController($scope, $timeout, $uibModalInstance, apartments, selectedApartmentId, rentCalculationsApiService) {
            $scope.rentCalculation = {apartment_id: selectedApartmentId.toString()};
            $scope.apartments = apartments;
            $scope.saveChanges = function () {
                rentCalculationsApiService.createRentCalculation($scope.rentCalculation).success(function (result) {
                    $uibModalInstance.close(result);
                }).error(function () {
                    //TODO Error
                    alert("Error");
                });
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        });