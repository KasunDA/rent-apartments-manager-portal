angular.module('app.pages.apartments.list', [])
    .config(function config($stateProvider) {
        $stateProvider.state('pages.apartmentsList', {
            url: '/apartments',
            controller: 'ApartmentsListController',
            templateUrl: 'pages/apartments/list.tpl.html',
            resolve: {
                apartments: function (apartmentsApiService) {
                    return apartmentsApiService.getAllApartments();
                }
            },
            data: {
                pageTitle: 'Apartments',
                pageClass: 'apartments'
            }
        });
    })
    .controller('ApartmentsListController',
        function ApartmentsListController($scope, $timeout, apartments, $uibModal, apartmentsApiService, roomsApiService) {
            $scope.apartments = apartments.data;

            var refreshApartments = function() {
                apartmentsApiService.getAllApartments().success(function(results) {
                   $scope.apartments = results;
                });
            };

            $scope.apartmentForm = function (apartment) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'pages/apartments/apartmentForm.tpl.html',
                    controller: 'ApartmentFormController',
                    size: 'lg',
                    resolve: {
                        editMode: apartment ? true : false,
                        apartment: apartment ? apartment : {}
                    }
                });

                modalInstance.result.then(function (success) {
                    if (success) {
                        refreshApartments();
                    }
                });

            };

            $scope.roomForm = function (room, apartment) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'pages/apartments/roomForm.tpl.html',
                    controller: 'RoomFormController',
                    size: 'lg',
                    resolve: {
                        editMode: room ? true : false,
                        room: room ? room : {apartment_id: apartment.id}
                    }
                });

                modalInstance.result.then(function (success) {
                    if (success) {
                        refreshApartments();
                    }
                });
            };

            $scope.removeApartment = function (apartment) {
                apartmentsApiService.removeApartment(apartment.id).success(function() {
                   refreshApartments();
                }).error(function(err) {
                    alert(err);
                });
            };

            $scope.removeRoom = function (room) {
                roomsApiService.removeRoom(room.id).success(function() {
                    refreshApartments();
                }).error(function(err) {
                    alert(err);
                });
            };
        });