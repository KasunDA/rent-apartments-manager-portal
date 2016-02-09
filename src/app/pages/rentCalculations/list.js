angular.module('app.pages.rentCalculations.list', [])
    .config(function config($stateProvider) {
        $stateProvider.state('pages.rentCalculationsList', {
            url: '/rentCalculations',
            controller: 'RentCalculationsListController',
            templateUrl: 'pages/rentCalculations/list.tpl.html',
            resolve: {
                rentCalculations: function (rentCalculationsApiService) {
                    return rentCalculationsApiService.getAllRentCalculations();
                },
                apartments: function (apartmentsApiService) {
                    return apartmentsApiService.getAllApartments();
                },
                billTypes: function(billTypesApiService) {
                    return billTypesApiService.getAllBillTypes();
                }
            },
            data: {
                pageTitle: 'RentCalculations',
                pageClass: 'rentCalculations'
            }
        });
    })
    .controller('RentCalculationsListController',
        function RentCalculationsListController($scope, $timeout, $state, rentCalculations, apartments, $uibModal, rentCalculationsApiService) {
            $scope.rentCalculations = rentCalculations.data;
            var refreshRentCalculations = function() {
                rentCalculationsApiService.getAllRentCalculations().success(function(results) {
                    $scope.rentCalculations = results;
                });
            };

            $scope.rentCalculationForm = function() {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'pages/rentCalculations/rentCalculationForm.tpl.html',
                    controller: 'RentCalculationFormController',
                    size: 'lg',
                    resolve: {
                        apartments: function() { return apartments.data; },
                        selectedApartmentId: apartments.data[0].id
                    }
                });

                modalInstance.result.then(function (result) {
                    if (result) {
                        $state.go("pages.rentCalculationEdit", {id:result});
                    }
                });
            };

            $scope.removeRentCalculation = function(rentCalculation) {
              rentCalculationsApiService.removeRentCalculation(rentCalculation.id).success(function() {
                 refreshRentCalculations();
              }).error(function(err) {
                  alert(err);
              });
            };
        });