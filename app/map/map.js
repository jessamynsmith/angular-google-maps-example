'use strict';

angular.module('googleMapsExample.map', ['ngRoute', 'ngGeolocation', 'googleMapsExample.yelp'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/map', {
      templateUrl: 'map/map.html',
      controller: 'MapCtrl'
    });
  }])

  .controller('MapCtrl', ['$scope', '$geolocation', 'uiGmapGoogleMapApi', 'Yelp',
    function($scope, $geolocation, uiGmapGoogleMapApi, Yelp) {

      var initializeMap = function(position) {
        $scope.map = {
          center: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          },
          zoom: 16
        };

        Yelp.search(position).then(function(data) {
          for (var i = 0; i < 10; i++) {
            var business = data.data.businesses[i];
            $scope.markers.push({
              id: i,
              labelContent: business.name,
              location: {
                latitude: business.location.coordinate.latitude,
                longitude: business.location.coordinate.longitude
              },
              //labelContent:'title'
            });
          }
        }, function(error) {
          console.log("Unable to access yelp");
        });
      };

      $scope.markers = [];

      uiGmapGoogleMapApi.then(function(maps) {

        $geolocation.getCurrentPosition({
          timeout: 3000
        }).then(function(position) {
          initializeMap(position);
        });
      });

    }]);
