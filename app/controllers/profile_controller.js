'use strict';

module.exports = function(app) {
  app.controller('ProfileController', ['ErrorService', 'httpService', '$location', 'AuthService',
  function(ErrorService, httpService, $location, $window) {
    const profileResource = httpService('users/profile');
    const userResource = httpService('users');
    const userComicsResource = httpService('users/comics');
    const _this = this;
    _this.readList = [];
    _this.unreadList = [];
    _this.sampleUser = {
      username: 'Tim',
      profileImage: 'https://s-media-cache-ak0.pinimg.com/736x/f8/ab/ca/f8abca4e6023dd27b355f0be0255888a.jpg',
      favorite_Hero: 'Superman',
      location: 'Seattle',
      Bio: 'About me .....'
    };
    _this.user;
    _this.profileEdit = false;

    var currentInfo = {};

    _this.setUser = function(user) {
      currentInfo = {
        username: user.username,
        profileImage: user.profileImage,
        age: user.age,
        city: user.city,
        state: user.state
      };
      console.log(currentInfo.username);
    };


    _this.edit = function(user) {
      // _this.profileEdit = true;
      _this.setUser(user);
    };

    _this.cancel = function(user) {
      _this.sampleUser.username = currentInfo.username;
      _this.sampleUser.age = currentInfo.age;
      _this.sampleUser.city = currentInfo.city;
      _this.sampleUser.state = currentInfo.state;
      _this.profileEdit = false;

    };

    _this.getProfileInfo = function() {
      profileResource.getOne().then((res) => {
        console.log(res);
        _this.user = res.data;
      }, function(error) {
        console.log(error);
      });
    };

    _this.removeProfile = function() {

      userResource.remove().then((res) => {
        AuthService.signOut();
        $location.path('/');
        console.log(res);
      }, function(error) {
        console.log(error);
      })
    }

    _this.getProfileInfo();

    _this.updateProfile = function(user) {
      console.log(user);
      profileResource.update(user).then((res) => {
        console.log(res);
        _this.profileEdit = false;
      }, function(error) {
        console.log(error);
      });


    };

    _this.markRead2 = function(book) {
      console.log(1);
      _this.removeBook2(book);
      _this.readList.push(book);
    };

    _this.removeBook2 = function(book) {
      console.log(2);
      _this.unreadList = _this.unreadList.filter((b) => b.marvel_id != book.marvel_id );
      _this.readList = _this.readList.filter((b) => b.marvel_id != book.marvel_id );
    };

    _this.markRead = function(book) {
      userComicsResource.update(book.marvel_id, book).then((res) => {
        console.log(res);
        _this.removeBook(book);
        _this.readList.push(book);
      }, function(error) {
        console.log(error);
      });

    };

    _this.removeBook = function(book) {
      userComicsResource.remove(book.marvel_id).then((res) => {
        console.log(res);
        _this.unreadList = _this.unreadList.filter((b) => b.name != book.name );
        _this.readList = _this.readList.filter((b) => b.name != book.name );
      }, function(error) {
        console.log(error);
      });

    };

    _this.getComics = function() {
      userComicsResource.getOne().then((res) => {
        console.log(res);
        res.data.forEach(function(book) {
          console.log(book);
          if(book.issue_number > 5) _this.readList.push(book);
          _this.unreadList.push(book);
        });
      }, function(error) {
        console.log(error);
      });

    };


  }]);
};
