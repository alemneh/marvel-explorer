'use strict';

module.exports = function(app) {
  app.controller('SigninController', ['$location', '$scope', 'AuthService', 'ErrorService', 'TabService',
  '$window',
    function($location, $scope, AuthService, ErrorService, TabService, $window) {
      const _this = this;
      var tabSrv = TabService();
      _this.switchForm = true;
      _this.verify = false;
      _this.signInPopup = false;

      _this.togglePopup = () => {
        _this.error = ErrorService(null);
        _this.signInPopup = !_this.signInPopup;
      }

      _this.toggleForm = function() {
        _this.switchForm = !_this.switchForm;
      }

      _this.toggleForm = function() {
        _this.switchForm = !_this.switchForm;
      }

      _this.showSignIn = () => {
        _this.error = ErrorService(null);
        _this.switchForm = true;
      }

      _this.showSignUp = () => {
        _this.switchForm = false;
      }

      _this.submitUser = user => {
        // check from validity
        $scope.$broadcast('show-errors-check-validity');
        if ($scope.signUpForm.$invalid) return;

        if (user.email) {
          _this.signUp(user);
        } else {
          _this.signIn(user);
        }
      }


      _this.checkSignedIn = (token) => {
        if (token) {
          return _this.signedIn = true;
        }
        _this.signedIn = false;
      }
      _this.checkSignedIn(AuthService.getToken());


      _this.signIn = function(user) {
        AuthService.signIn(user, (err, res) => {
          if(err) return _this.error = ErrorService('Invalid Username or Password');
          _this.error = ErrorService(null);
          console.log(res);
          _this.signedIn = true;
          _this.verify = false;
          $window.location.reload();
          _this.togglePopup();
          for (var key in user) {
            delete user[key];
          }
        });
      };

      _this.signUp = function(user) {
        AuthService.createUser(user, function(err, res) {
          if(err) {
            return _this.error = ErrorService(err.data.username[0]);
          }
          _this.error = ErrorService(null);
          _this.showSignIn();
          _this.verify = true;
          console.log(verify);
          for (var key in user) {
            delete user[key];
          }
        });
      };

      _this.signOut = function() {
        AuthService.signOut(() => {
          $location.path('/');
          $window.location.reload();
          _this.signedIn = false;
          tabSrv.setTab(1);
        });
      };

    }]);
};
