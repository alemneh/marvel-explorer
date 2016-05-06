'use strict';

const angular = require('angular');
require('angular-route');
require('angular-animate');

const app = angular.module('marvelApp', ['ngRoute', 'ngAnimate']);
  // SERVICES
require('./services/error_service')(app);
require('./services/auth_service')(app);
require('./services/http_services')(app);
require('./services/characterInfo_service')(app);
  // CONTROLLERS
require('./controllers/findCharacter_controller')(app);
require('./controllers/character_controller')(app);
require('./controllers/signin_controller')(app);
require('./controllers/profile_controller')(app);
require('./controllers/comicbook_controller')(app);


var sampleUser = {name: 'Mr. User', username: 'user', password: 'password'};

app.controller('TabController', function($location) {
  let _this = this;
  if ($location.$$path == '/') _this.tab = 1;
  if ($location.$$path == '/profile') _this.tab = 2;
  if ($location.$$path == '/find-character') _this.tab = 3;
  if ($location.$$path == '/character') _this.tab = 4

  _this.setTab = num => _this.tab = num;
  _this.isSet = num => _this.tab == num;
});

app.run(['$rootScope', '$location', '$route', '$window', function($rootScope, $location, $route, $window) {
  $rootScope.$on('$locationChangeStart', function(event, next, current) {
    if(current == 'http://localhost:9000/#/character' && next == 'http://localhost:9000/#/character') {
      $location.path('/find-character');
      console.log('Current: '+current);
      console.log('Next: '+next);
    }

    var nextRoute = $route.routes[$location.path()];
    if(nextRoute.requireLogin) {
      if(!$window.localStorage.token) {
        event.preventDefault();
        $location.path('/');
      }
    }
  })
}]).controller('AppController', ['$window', 'ErrorService', function($window, ErrorService) {
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
    controllerAs: 'profileCtrl',
    requireLogin: true

  })
  .when('/find-character', {
    templateUrl: 'views/find_character.html',
    controller: 'FindCharacterController',
    controllerAs: 'findCtrl'
  })
  .when('/character', {
    templateUrl: 'views/character.html',
    controller: 'CharacterController',
    controllerAs: 'characterCtrl'
  })
  .when('/comic-book', {
    templateUrl: 'views/comic_book.html',
    controller: 'ComicBookController',
    controllerAs: 'comicbookCtrl'
  });
  // .when('/compare-characters', {
  //   templateUrl: 'views/compare_characters.html'
  // })
}]);
