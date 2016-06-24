'use strict';

const angular = require('angular');
require('angular-route');
require('angular-animate');

const app = angular.module('marvelApp', ['ngRoute', 'ngAnimate']);
  // SERVICES
require('./services/tab_service')(app);
require('./services/error_service')(app);
require('./services/auth_service')(app);
require('./services/http_services')(app);
require('./services/characterInfo_service')(app);
require('./services/comicbook_service')(app);
  // CONTROLLERS
require('./controllers/findCharacter_controller')(app);
require('./controllers/character_controller')(app);
require('./controllers/signin_controller')(app);
require('./controllers/profile_controller')(app);
require('./controllers/comicbook_controller')(app);

app.controller('TabController', ['$location', '$window', 'TabService',
function($location, $window, TabService) {
  var tabSrv = TabService();
  let _this = this;
  _this.token = $window.localStorage.token;
  _this.setTab = num => tabSrv.setTab(num);
  _this.isSet = num => tabSrv.isSet(num);
}]);

app.run(['$rootScope', '$location', '$route', '$window',
  function($rootScope, $location, $route, $window) {
    $rootScope.$on('$locationChangeStart', function(event, next, current) {
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
  _this.error = ErrorService(null);

  _this.togglePopup = () => {
    signinSrv.togglePopup()
  }

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
    templateUrl: 'views/signinPopup.html'
  };
});

app.directive('signinButton', function() {
  return {
    restrict: 'E',
    replace: true,
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

app.directive('characterPopup', function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'views/character_popup.html'
  }
});

app.config(['$routeProvider', router => {
  router
  .when('/', {
    templateUrl: 'views/home.html'
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
