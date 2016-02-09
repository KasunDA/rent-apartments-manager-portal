angular.module('app.api.usersApiService', [])
    .service('usersApiService',
        function ($q, $http, envConfig) {
            var baseUrl = envConfig.baseApiUrl + 'users';

            this.getAllUsers = function() {
                return $http({
                    method: 'GET',
                    url: baseUrl
                })
            };

            this.getUserById = function(id) {
                return $http({
                    method: 'GET',
                    url: baseUrl + '/' + id
                })
            };

            this.createUser = function(user) {
              return $http({
                  method: 'POST',
                  url: baseUrl,
                  data: user
              })
            };

            this.editUser = function(user) {
                return $http({
                    method: 'PUT',
                    url: baseUrl + '/' + user.id,
                    data: user
                })
            };

            this.removeUser = function(id) {
                return $http({
                    method: 'DELETE',
                    url: baseUrl + '/' + id
                })
            };
        }
    );
