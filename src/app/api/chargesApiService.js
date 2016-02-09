angular.module('app.api.chargesApiService', [])
    .service('chargesApiService',
        function ($q, $http, envConfig) {
            var baseUrl = envConfig.baseApiUrl + 'charges';

            this.getAllCharges = function() {
                return $http({
                    method: 'GET',
                    url: baseUrl
                })
            };

            this.getChargeById = function(id) {
                return $http({
                    method: 'GET',
                    url: baseUrl + '/' + id
                })
            };

            this.createCharge = function(charge) {
              return $http({
                  method: 'POST',
                  url: baseUrl,
                  data: charge
              })
            };

            this.editCharge = function(charge) {
                return $http({
                    method: 'PUT',
                    url: baseUrl + '/' + charge.id,
                    data: charge
                })
            };

            this.removeCharge = function(id) {
                return $http({
                    method: 'DELETE',
                    url: baseUrl + '/' + id
                })
            };
        }
    );
