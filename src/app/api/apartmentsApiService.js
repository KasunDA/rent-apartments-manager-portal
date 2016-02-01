angular.module('app.api.apartmentsApiService', [])
    .service('apartmentsApiService',
        function ($q, $http, envConfig) {
            var baseUrl = envConfig.baseApiUrl + 'apartments';

            this.getAllApartments = function() {
                return $http({
                    method: 'GET',
                    url: baseUrl
                })
            };

            this.getApartmentById = function(id) {
                return $http({
                    method: 'GET',
                    url: baseUrl + '/' + id
                })
            };

            this.createApartment = function(apartment) {
              return $http({
                  method: 'POST',
                  url: baseUrl,
                  data: apartment
              })
            };

            this.editApartment = function(apartment) {
                return $http({
                    method: 'PUT',
                    url: baseUrl + '/' + apartment.id,
                    data: apartment
                })
            }
        }
    );
