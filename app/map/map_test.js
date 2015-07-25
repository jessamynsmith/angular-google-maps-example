'use strict';

describe('googleMapsExample.map module', function() {
  var scope;

  beforeEach(module('googleMapsExample.map'));

  describe('map controller', function() {
    it('should ....', inject(function($rootScope, $controller, $q) {
      scope = $rootScope.$new();
      var mapsApi = $q.defer();
      var mapCtrl = $controller('MapCtrl', {$scope: scope, uiGmapGoogleMapApi: mapsApi.promise});
      expect(mapCtrl).toBeDefined();
    }));

  });
});
