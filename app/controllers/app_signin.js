'use strict';

module.exports = function(app) {
  app.controller('SigninController', ['$location', 'AuthService', 'ErrorService',
    function($location, AuthService, ErrorService) {
      const _this = this;
      _this.signedIn = false;

      _this.submitUser = user => {
        if (user.email) {
          _this.signUp(user);
        } else {
          _this.signIn(user);
        }
        for (var key in user) {
          delete user[key];
        }
      }

      _this.togglePopup = () => {
        _this.error = ErrorService(null);
        _this.signInPopup = !_this.signInPopup;
      }

      _this.signIn = function(user) {
        AuthService.signIn(user, (err, res) => {
          if(err) return _this.error = ErrorService('Invalid Username or Password');
          _this.error = ErrorService(null);
          _this.signedIn = true;
          _this.togglePopup();
        });
      };

      _this.signUp = function(user) {
        AuthService.createUser(user, function(err, res) {
          if(err) return _this.error = ErrorService('signup error');
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
