'use strict';

module.exports = function(app) {
  app.controller('LoginController', ['$location', 'AuthService', 'ErrorService',
    function($location, AuthService, ErrorService) {
      const _this = this;

      _this.signIn = function(user) {
        AuthService.signIn(user, (err, res) => {
          if(err) return _this.error = ErrorService('Problem logging in');
          _this.error = ErrorService(null);
          _this.signedIn = true;
        });
      };

      _this.signUp = function(user) {
        AuthService.createUser(user, function(err, res) {
          if(err) return _this.error = ErrorService('Problem signing up');
          _this.error = ErrorService(null);
          _this.signedIn = true;

        });
      };

      _this.signOut = function() {
        AuthService.signOut(() => {
          $location.path('/');
          _this.signedIn = false;
        });
      };

    }]);
};
