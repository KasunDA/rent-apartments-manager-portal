angular.module('app.pages.billTypes.list', [])
    .config(function config($stateProvider) {
        $stateProvider.state('pages.billTypesList', {
            url: '/billTypes',
            controller: 'BillTypesListController',
            templateUrl: 'pages/billTypes/list.tpl.html',
            resolve: {
                billTypes: function (billTypesApiService) {
                    return billTypesApiService.getAllBillTypes();
                }
            },
            data: {
                pageTitle: 'BillTypes',
                pageClass: 'billTypes'
            }
        });
    })
    .controller('BillTypesListController',
        function BillTypesListController($scope, $timeout, billTypes, $uibModal, billTypesApiService, roomsApiService) {
            $scope.billTypes = billTypes.data;
            var refreshBillTypes = function() {
                billTypesApiService.getAllBillTypes().success(function(results) {
                   $scope.billTypes = results;
                });
            };

            $scope.billTypeForm = function (billType) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'pages/billTypes/billTypeForm.tpl.html',
                    controller: 'BillTypeFormController',
                    size: 'lg',
                    resolve: {
                        editMode: billType ? true : false,
                        billType: billType ? billType : {}
                    }
                });

                modalInstance.result.then(function (success) {
                    if (success) {
                        refreshBillTypes();
                    }
                });

            };

            $scope.removeBillType = function (billType) {
                billTypesApiService.removeBillType(billType.id).success(function() {
                   refreshBillTypes();
                }).error(function(err) {
                    alert(err);
                });
            };

        });