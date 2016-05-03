'use strict';

const angular = require('angular');
require('angular-route');
require('angular-animate');

const app = angular.module('marvelApp', ['ngRoute', 'ngAnimate']);
require('./services/error_service')(app);
require('./services/auth_service')(app);
require('./controllers/signin_controller')(app);
require('./controllers/profile_controller')(app);

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
  // _this.signedIn = false;
  //
  // _this.checkSignedIn = (token) => {
  //   if (token) {
  //     return _this.signedIn = true;
  //   }
  //   _this.signedIn = false;
  // }
  // _this.checkSignedIn($window.localStorage.meToken);



  _this.cancel = input => {
    for (var key in input) {
      delete input[key];
    }
  };

}]);

app.directive('navbar', function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'views/nav.html'
  };
});

app.directive('signinPopup', function() {
  return {
    restrict: 'E',
    replace: true,
    controller: 'SigninController',
    controllerAs: 'signinCtrl',
    templateUrl: 'views/signinPopup.html'
  };
});

app.directive('signinButton', function() {
  return {
    restrict: 'E',
    replace: true,
    controller: 'SigninController',
    controllerAs: 'signinCtrl',
    templateUrl: 'views/signin_signout.html'
  };
});




app.directive('carousel', function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'views/carousel.html'
  };
});

app.config(['$routeProvider', router => {
  router
  .when('/', {
    templateUrl: 'views/home.html',
    controller: 'TabController'
  })
  .when('/profile', {
    templateUrl: 'views/profile.html',
    controller: 'ProfileController',
    controllerAs: 'profileCtrl'

  });
}]);
