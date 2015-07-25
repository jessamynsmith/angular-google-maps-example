'use strict';

angular.module('googleMapsExample.map', ['ngRoute', 'googleMapsExample.yelp'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/map', {
      templateUrl: 'map/map.html',
      controller: 'MapCtrl'
    });
  }])

  .controller('MapCtrl', ['$scope', 'uiGmapGoogleMapApi', 'Yelp',
    function($scope, uiGmapGoogleMapApi, Yelp) {

      $scope.markers = [];

      uiGmapGoogleMapApi.then(function(maps) {
        $scope.map = {
          center: {latitude: 43.7, longitude: -79.4},
          zoom: 16
        };

        Yelp.search().then(function(data) {
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
      });

    }]);
