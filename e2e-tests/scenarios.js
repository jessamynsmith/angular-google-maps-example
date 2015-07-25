'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /map when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/map");
  });


  describe('map', function() {

    beforeEach(function() {
      browser.get('#/map');
    });


    it('should render map when user navigates to /map', function() {
      // TODO make this actually test map existence
      //expect(element.all(by.css('[ng-view] ui-gmap-google-map')).first().getText()).
      expect(element.all(by.css('p')).first().getText()).
        toMatch(/Jessamyn Smith/);
    });

  });
});
