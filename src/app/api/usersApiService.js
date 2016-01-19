angular.module('app.api.usersApiService', [])
    .service('usersApiService',
        function ($q, $http, envConfig) {
            this.getAllUsers = function() {
                return $http({
                    method: 'GET',
                    url: envConfig.baseApiUrl + 'users'
                })
            };

            this.getUserById = function(id) {
                return $http({
                    method: 'GET',
                    url: envConfig.baseApiUrl + 'users/' + id
                })
            };
        }
    );
