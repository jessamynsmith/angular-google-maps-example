'use strict';

// Declare app level module which depends on views, and components
angular.module('googleMapsExample', [
  'ngRoute',
  'uiGmapgoogle-maps',
  'googleMapsExample.map'
])

  .config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
      //key: 'your api key',
      //libraries: 'weather,geometry,visualization',
      v: '3.17'
    });
  })

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/map'});
  }]);
