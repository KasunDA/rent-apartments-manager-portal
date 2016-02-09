angular.module('app.api.billTypesApiService', [])
    .service('billTypesApiService',
        function ($q, $http, envConfig) {
            var baseUrl = envConfig.baseApiUrl + 'bill_types';

            this.getAllBillTypes = function() {
                return $http({
                    method: 'GET',
                    url: baseUrl
                })
            };

            this.getBillTypeById = function(id) {
                return $http({
                    method: 'GET',
                    url: baseUrl + '/' + id
                })
            };

            this.createBillType = function(billType) {
              return $http({
                  method: 'POST',
                  url: baseUrl,
                  data: billType
              })
            };

            this.editBillType = function(billType) {
                return $http({
                    method: 'PUT',
                    url: baseUrl + '/' + billType.id,
                    data: billType
                })
            };

            this.removeBillType = function(id) {
                return $http({
                    method: 'DELETE',
                    url: baseUrl + '/' + id
                })
            };
        }
    );
