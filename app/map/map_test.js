'use strict';

describe('googleMapsExample.map module', function() {
  var scope;

  // Mock unavailable modules
  angular.module('ngGeolocation', []);
  angular.module('googleMapsExample.yelp', []);

  beforeEach(module('googleMapsExample.map'));

  describe('map controller', function() {
    it('should ....', inject(function($rootScope, $controller, $q) {
      scope = $rootScope.$new();
      var mapsApi = $q.defer();
      var yelp = {search: function() {}};
      var parameters = {
        $scope: scope,
        $geolocation: null,
        uiGmapGoogleMapApi: mapsApi.promise,
        Yelp: yelp
      };
      var mapCtrl = $controller('MapCtrl', parameters);
      expect(mapCtrl).toBeDefined();
    }));

  });
});
