'use strict';

angular.module('googleMapsExample.yelp', ['googleMapsExample.constants'])

  .factory('Yelp', function($http, $q, apiUrl) {
    return {
      search: function() {
        return $http({
          method: "get",
          url: apiUrl + 'api/v1/yelp/search',
          params: {
            limit: 10,
            radius_filter: 500,
            sort: 1,
            ll: "43.7,-79.4"
          }
        });
      }
    };
  });
