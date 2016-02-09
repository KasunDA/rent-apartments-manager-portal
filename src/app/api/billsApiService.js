angular.module('app.api.billsApiService', [])
    .service('billsApiService',
        function ($q, $http, envConfig) {
            var baseUrl = envConfig.baseApiUrl + 'bills';

            this.getAllBills = function() {
                return $http({
                    method: 'GET',
                    url: baseUrl
                })
            };

            this.getBillById = function(id) {
                return $http({
                    method: 'GET',
                    url: baseUrl + '/' + id
                })
            };

            this.createBill = function(bill) {
              return $http({
                  method: 'POST',
                  url: baseUrl,
                  data: bill
              })
            };

            this.editBill = function(bill) {
                return $http({
                    method: 'PUT',
                    url: baseUrl + '/' + bill.id,
                    data: bill
                })
            };

            this.removeBill = function(id) {
                return $http({
                    method: 'DELETE',
                    url: baseUrl + '/' + id
                })
            };
        }
    );
