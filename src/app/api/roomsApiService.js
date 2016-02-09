angular.module('app.api.roomsApiService', [])
    .service('roomsApiService',
        function ($q, $http, envConfig) {
            var baseUrl = envConfig.baseApiUrl + 'rooms';

            this.getAllRooms = function() {
                return $http({
                    method: 'GET',
                    url: baseUrl
                })
            };

            this.getRoomById = function(id) {
                return $http({
                    method: 'GET',
                    url: baseUrl + '/' + id
                })
            };

            this.createRoom = function(room) {
              return $http({
                  method: 'POST',
                  url: baseUrl,
                  data: room
              })
            };

            this.editRoom = function(room) {
                return $http({
                    method: 'PUT',
                    url: baseUrl + '/' + room.id,
                    data: room
                })
            };

            this.removeRoom = function(id) {
                return $http({
                    method: 'DELETE',
                    url: baseUrl + '/' + id
                })
            };
        }
    );
