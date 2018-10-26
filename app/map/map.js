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
      $scope.params = {
        term: ''
      };

      // Default to downtown Toronto
      var defaultPosition = {
        latitude: 43.6722780,
        longitude: -79.3745125
      };
      var zoomLevel = 16;

      $scope.map = {
        center: defaultPosition,
        zoom: zoomLevel
      };

      var initializeMap = function(position) {
        if (!position) {

          position = {
            coords: defaultPosition
          };
        }

        $scope.map = {
          center: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          },
          zoom: zoomLevel
        };

        // Make info window for marker show up above marker
        $scope.windowOptions = {
          pixelOffset: {
            height: -32,
            width: 0
          }
        };

        searchYelp(position);
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

      var searchYelp = function(position) {
        $scope.markers = [];
        Yelp.search(position, $scope.params.term).then(function(data) {
          var businesses = data.data.jsonBody.businesses;
          for (var i = 0; i < businesses.length; i++) {
            var business = businesses[i];
            $scope.markers.push({
              id: i,
              name: business.name,
              url: business.url,
              location: {
                latitude: business.coordinates.latitude,
                longitude: business.coordinates.longitude
              }
            });
          }
        }, function(error) {
          console.log("Unable to access yelp");
          console.log(error);
        });
      };

      $scope.search = function() {
        var position = {
          coords: $scope.map.center
        };
        searchYelp(position);
      };

    }]);
