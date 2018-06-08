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

      const searchYelp = function(position) {
        $scope.markers = [];
        Yelp.search(position, $scope.params.term).then(function(data) {
          for (var i = 0; i < data.data.businesses.length; i++) {
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

      $scope.search = function() {
        const position = {
          coords: $scope.map.center
        };
        searchYelp(position);
      };

    }]);
