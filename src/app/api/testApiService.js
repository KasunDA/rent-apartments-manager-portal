angular.module('app.api.testApiService', [])
    .service('testApiService',
        function ($q, $http) {
            this.testApi = function() {
                return $http({
                    method: 'GET',
                    url: 'https://httpbin.org/get',
                    noRefreshOnUnauthorized: true,
                    data: {'test': 'passed'}
                })
            };
        }
    );
