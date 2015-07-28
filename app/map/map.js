'use strict';

angular.module('angularGoogleMapsExample.map', ['ngRoute', 'ngGeolocation', 'angularGoogleMapsExample.yelp'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/map', {
      templateUrl: 'map/map.html',
      controller: 'MapCtrl'
    });
  }])

  .controller('MapCtrl', ['$scope', '$timeout', '$geolocation', 'uiGmapGoogleMapApi', 'Yelp',
    function($scope, $timeout, $geolocation, uiGmapGoogleMapApi, Yelp) {

      $scope.markers = [];
      $scope.infoVisible = false;
      $scope.infoBusiness = {};

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
        if (!position) {
          // Default to downtown Toronto
          position = {
            coords: {
              latitude: 43.6722780,
              longitude: -79.3745125
            }
          };
        }

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
          console.log(error);
        });
      };

      uiGmapGoogleMapApi.then(function(maps) {
        // Don't pass timeout parameter here; that is handled by setTimeout below
        $geolocation.getCurrentPosition({}).then(function(position) {
            initializeMap(position);
          },
          function(error) {
            console.log(error);
            initializeMap();
          });
      });

      // Deal with case where user does not make a selection
      $timeout(function() {
        if (!$scope.map) {
          console.log("No confirmation from user, using fallback");
          initializeMap();
        }
      }, 5000);

    }]);
