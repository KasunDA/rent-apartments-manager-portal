angular.module('app.api.testApiService', [])
    .service('testApiService',
        function ($q, $http, envConfig) {
            this.testApi = function() {
                return $http({
                    method: 'GET',
                    url: envConfig.baseApiUrl,
                    noRefreshOnUnauthorized: true
                })
            };
        }
    );
