'use strict';

const angular = require('angular');
require('angular-route');

const app = angular.module('marvelApp', ['ngRoute']);
require('./services/error_service')(app);

var sampleUser = {name: 'Mr. User', username: 'user', password: 'password'};

app.controller('TabController', function($location) {
  let _this = this;
  if ($location.$$path == '/') _this.tab = 1;
  if ($location.$$path == '/profile') _this.tab = 2;

  _this.setTab = num => _this.tab = num;
  _this.isSet = num => _this.tab == num;
});

app.controller('AppController', ['$window', 'ErrorService', function($window, ErrorService) {
  const _this = this;
  _this.signInPopup = false;
  _this.error = ErrorService(null);
  _this.signedIn = false;

  // find out how to stay logged in through refreshes. How is this tracked
  _this.checkSignedIn = (token) => {
    if (token) {
      // TODO: httpService.validate(token).then();
      return _this.signedIn = true;
    }
    _this.signedIn = false;
  }
  _this.checkSignedIn($window.localStorage.meToken);

  _this.submitUser = user => {
    // TODO: httpService.signin(user).then();
    if (user.username == sampleUser.username && user.password == sampleUser.password) {
      _this.error = ErrorService(null);
      _this.signedIn = true;
      $window.localStorage.meToken = 'sdfklksdlkfhvnbbkweb';
      _this.signingIn();
    } else {
      _this.error = ErrorService('Incorrect Username or Password');
    }
    delete user.username;
    delete user.password;
  }

  _this.signingIn = () => {
    _this.error = ErrorService(null);
    _this.signInPopup = !_this.signInPopup;
  }

  _this.signOut = () => {
    delete $window.localStorage.meToken;
    _this.signedIn = false;
  }

  _this.cancel = input => {
    for (var key in input) {
      delete input[key];
    }
  }

}]);

app.directive('navbar', function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'views/nav.html'
  }
});

app.directive('signinPopup', function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'views/signinPopup.html'
  }
});

app.directive('signinButton', function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'views/signin_signout.html'
  }
});

app.directive('carousel', function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'views/carousel.html'
  }
});

app.config(['$routeProvider', router => {
  router
  .when('/', {
    templateUrl: 'views/home.html',
    controller: 'TabController'
  })
  .when('/profile', {
    templateUrl: 'views/profile.html',
    controller: 'TabController'
  })
}]);
