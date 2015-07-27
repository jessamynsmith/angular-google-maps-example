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

      $scope.infoVisible = false;
      $scope.infoBusines = {};

      // Initialize and show infoWindow for business
      $scope.showInfo = function(marker, eventName, markerModel) {
        $scope.infoBusiness = markerModel;
        $scope.infoVisible = true;
      };

      // Hide infoWindow when 'x' is clicked
      $scope.hideInfo = function() {
        $scope.infoVisible = false;
      };

      var initializeMap = function(position) {
        $scope.map = {
          center: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          },
          zoom: 16
        };

        // Make info window for marker show up above marker
        $scope.windowOptions = {
          pixelOffset: {
            height: -32,
            width: 0
          }
        };

        Yelp.search(position).then(function(data) {
          for (var i = 0; i < 10; i++) {
            var business = data.data.businesses[i];
            $scope.markers.push({
              id: i,
              name: business.name,
              url: business.url,
              location: {
                latitude: business.location.coordinate.latitude,
                longitude: business.location.coordinate.longitude
              }
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
