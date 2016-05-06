'use strict';

module.exports = function(app) {
  app.controller('SigninController', ['$location', '$scope', 'AuthService', 'ErrorService',
    function($location, $scope, AuthService, ErrorService) {
      const _this = this;
      _this.switchForm = true;
      _this.verify = false;

      _this.togglePopup = () => {
        _this.error = ErrorService(null);
        _this.signInPopup = !_this.signInPopup;
      }

      _this.toggleForm = () => {
        _this.switchForm = !_this.switchForm;
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
          _this.toggleForm();
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
          _this.signedIn = false;
          $scope.$digest();
        });
      };

    }]);

    // // http://blog.yodersolutions.com/bootstrap-form-validation-done-right-in-angularjs/
    // app.directive('showErrors', function() {
    //   return {
    //     restrict: 'A',
    //     require:  '^form',
    //     link: function (scope, el, attrs, formCtrl) {
    //       // find the text box element, which has the 'name' attribute
    //       var inputEl   = el[0].querySelector('[name]');
    //       // convert the native text box element to an angular element
    //       var inputNgEl = angular.element(inputEl);
    //       // get the name on the text box so we know the property to check
    //       // on the form controller
    //       var inputName = inputNgEl.attr('name');
    //
    //       // only apply the has-error class after the user leaves the text box
    //       inputNgEl.bind('blur', function() {
    //         el.toggleClass('has-error', formCtrl[inputName].$invalid);
    //       });
    //
    //       scope.$on('show-errors-check-validity', function() {
    //         el.toggleClass('has-error', formCtrl[inputName].$invalid);
    //       });
    //     }
    //   }
    // });
};
