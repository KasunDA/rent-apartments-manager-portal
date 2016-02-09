angular.module('app.pages.billTypes.billTypeForm', [])
    .controller('BillTypeFormController',
        function BillTypeFormController($scope, $uibModalInstance, billType, editMode, billTypesApiService) {
            $scope.billType = billType;
            $scope.editMode = editMode;

            $scope.saveChanges = function () {
                var request = editMode ? billTypesApiService.editBillType : billTypesApiService.createBillType;

                request($scope.billType).success(function (result) {
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