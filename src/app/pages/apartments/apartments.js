angular.module('app.pages.apartments', [
    'app.api.apartmentsApiService',
    'app.pages.apartments.list'
]);

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
        function ApartmentsListController($scope, $timeout, apartments) {
            $scope.apartments = apartments.data;
        });