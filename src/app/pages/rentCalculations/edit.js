angular.module('app.pages.rentCalculations.edit', [])
    .config(function config($stateProvider) {
        $stateProvider.state('pages.rentCalculationEdit', {
            url: '/rentCalculations/:id',
            controller: 'RentCalculationsEditController',
            templateUrl: 'pages/rentCalculations/edit.tpl.html',
            resolve: {
                rentCalculation: function (rentCalculationsApiService, $stateParams) {
                    return rentCalculationsApiService.getRentCalculationById($stateParams.id);
                },
                billTypes: function (billTypesApiService) {
                    return billTypesApiService.getAllBillTypes();
                },
                apartment: function (rentCalculation, apartmentsApiService) {
                    return apartmentsApiService.getApartmentById(rentCalculation.data.apartment.id);
                }
            },
            data: {
                pageTitle: 'RentCalculation',
                pageClass: 'rentCalculation'
            }
        });
    })
    .controller('RentCalculationsEditController',
        function RentCalculationsEditController($scope, $q, $state, rentCalculation, billTypes, apartment, rentCalculationsApiService, billsApiService, chargesApiService) {
            $scope.apartment = apartment.data;
            $scope.rentCalculation = rentCalculation.data;

            $scope.bills = [];
            $scope.charges = [];

            apartment.data.rooms.forEach(function (room) {
                room.tenants.forEach(function (tenant) {
                    var existing = rentCalculation.data.charges.filter(function (c) {
                        return c.user.id == tenant.id;
                    })[0];

                    var charge = existing ? existing : {user_id: tenant.id, rent_calculation_id: rentCalculation.data.id};
                    charge.user = tenant;
                    charge.selected = existing ? true : false;
                    charge.roomPrice = room.price;
                    $scope.charges.push(charge);
                });
            });

            billTypes.data.forEach(function (bt) {
                var existing = rentCalculation.data.bills.filter(function (b) {
                    return b.bill_type_id == bt.id;
                })[0];
                var bill = existing ? existing : {bill_type_id: bt.id, rent_calculation_id: rentCalculation.data.id};
                bill.bill_type = bt;
                bill.selected = existing ? true : false;
                bill.disabled = !bt.chargeable;

                $scope.bills.push(bill);
            });

            if (!$scope.rentCalculation.bills) {
                $scope.bills = [];
                billTypes.data.each(function (bt) {
                });
            }

            $scope.calculateCharges = function () {
                var bills = 0;
                $scope.bills.forEach(function (b) {
                    if (b.bill_type.should_calculate && b.selected) {
                        bills += b.amount;
                    }
                });

                var charges = $scope.charges.filter(function (c) {
                    return c.selected;
                });

                var billPerPerson = bills / charges.length;

                charges.forEach(function (charge) {
                    charge.bills = billPerPerson;
                    charge.rent = parseInt(charge.roomPrice);
                });
            };

            $scope.save = function () {
                rentCalculationsApiService.editRentCalculation($scope.rentCalculation).success(function () {
                    var promises = [];
                    var defer = $q.defer();

                    $scope.charges.forEach(function (charge) {
                        if (charge.id && !charge.selected) {
                            promises.push(chargesApiService.removeCharge(charge.id));
                        }
                        else if (charge.selected) {
                            var chargeRequest = charge.id ? chargesApiService.editCharge : chargesApiService.createCharge;
                            promises.push(chargeRequest(charge));
                        }
                    });

                    $scope.bills.forEach(function (bill) {
                        if (bill.id && !bill.selected) {
                            promises.push(chargesApiService.removeCharge(bill.id));
                        }
                        else if (bill.selected) {
                            var billRequest = bill.id ? billsApiService.editBill : billsApiService.createBill;
                            promises.push(billRequest(bill));
                        }
                    });

                    $q.all(promises).then(function() {
                        $state.reload();
                    });
                });
            };

        });