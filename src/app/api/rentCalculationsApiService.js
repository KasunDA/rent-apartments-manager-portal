angular.module('app.api.rentCalculationsApiService', [])
    .service('rentCalculationsApiService',
        function ($q, $http, envConfig) {
            var baseUrl = envConfig.baseApiUrl + 'rent_calculations';

            this.getAllRentCalculations = function() {
                return $http({
                    method: 'GET',
                    url: baseUrl
                })
            };

            this.getRentCalculationById = function(id) {
                return $http({
                    method: 'GET',
                    url: baseUrl + '/' + id
                })
            };

            this.createRentCalculation = function(rentCalculation) {
              return $http({
                  method: 'POST',
                  url: baseUrl,
                  data: rentCalculation
              })
            };

            this.editRentCalculation = function(rentCalculation) {
                return $http({
                    method: 'PUT',
                    url: baseUrl + '/' + rentCalculation.id,
                    data: rentCalculation
                })
            };

            this.removeRentCalculation = function(id) {
                return $http({
                    method: 'DELETE',
                    url: baseUrl + '/' + id
                })
            };
        }
    );
