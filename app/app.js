'use strict';

// Declare app level module which depends on views, and components
angular.module('angularGoogleMapsExample', [
  'ngRoute',
  'uiGmapgoogle-maps',
  'angularGoogleMapsExample.map'
])

  .config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyCsMa9OnG_6l1y-vGtZL_82FezdOnfcpJI',
      //libraries: 'weather,geometry,visualization',
      v: '3.26'
    });
  })

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/map'});
  }]);
