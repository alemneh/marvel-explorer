require('../app/app.js');
const angular = require('angular');
require('angular-mocks');

describe('it should test something', () => {
  var profileController;
  it('should have a test', () => {
    expect(false).toBe(false);
  })

  beforeEach(angular.mock.module('marvelApp'))
  beforeEach(angular.mock.inject(function($controller) {
    profileController = $controller('ProfileController')
  }))

  it('should construct a controller', () => {
    expect(typeof profileController).toBe('object');
    expect(typeof profileController.setUser).toBe('function');
    expect(typeof profileController.cancel).toBe('function');
    expect(typeof profileController.edit).toBe('function');
    expect(typeof profileController.update).toBe('function');
    expect(typeof profileController.markRead).toBe('function');
    expect(typeof profileController.removeBook).toBe('function');
  })

  describe('REST tests', () => {
    var $httpBackend;
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
    }));
    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    })

    it('get a reading list', () => {
      $httpBackend.expectGet('http://localhost:3000/')
        .respond(200, {data: [{list: ['Spiderman']}]});
      profileController.getList();
      $httpBackend.flush();
    })
  })
});
