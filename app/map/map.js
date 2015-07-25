'use strict';

angular.module('myApp.map', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/map', {
    templateUrl: 'map/map.html',
    controller: 'MapCtrl'
  });
}])

.controller('MapCtrl', function($scope, uiGmapGoogleMapApi) {

    uiGmapGoogleMapApi.then(function(maps) {
    console.log("Map is ready");
    $scope.map = {
      center: {latitude: 43.7, longitude: -79.4},
      zoom: 10
    };

    $scope.markers = [{
      id: "1",
      location: {
        latitude: 43.71,
        longitude: -79.35
      }
    },{
      id: "2",
      location: {
        latitude: 43.75,
        longitude: -79.39
      }
    },{
      id: "3",
      location: {
        latitude: 43.69,
        longitude: -79.48
      }
    }];
  });

});
