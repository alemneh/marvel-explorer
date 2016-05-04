'use strict';

module.exports = function(app) {
  app.controller('ProfileController', ['ErrorService', function(ErrorService) {
    // const readingListResource = httpService('readinglist');
    const _this = this;
    _this.readList = [{name: 'X-Men'},{name:'Spider Man'}, {name:'Thor'},{name:'Iron Man'}];
    _this.unreadList = [{name: 'Superman'},{name: 'Batman'},{name:'Ice Man'}];
    _this.sampleUser = {
      username: 'Tim',
      profileImage: 'http://www.corporatetraveller.ca/assets/images/profile-placeholder.gif',
      age: 25,
      city: 'Seattle',
      state: 'WA'
    }

    _this.profileEdit = false;

    var currentInfo = {};
    var newInfo = {};

    _this.setUser = function(user) {
      currentInfo = {
        username: user.username,
        profileImage: user.profileImage,
        age: user.age,
        city: user.city,
        state: user.state
      }
      console.log(currentInfo.username);
    }


    _this.edit = function(user) {
      _this.profileEdit = true;
      _this.setUser(user);
    };

    _this.cancel = function(user) {
      _this.sampleUser.username = currentInfo.username;
      _this.sampleUser.age = currentInfo.age;
      _this.sampleUser.city = currentInfo.city;
      _this.sampleUser.state = currentInfo.state;
      _this.profileEdit = false;

    }

    _this.update = function(user) {
      _this.profileEdit = false;

    }

    _this.markRead = function(book) {
      console.log('hit');
      _this.removeBook(book);
      _this.readList.push(book);
    }

    _this.removeBook = function(book) {
      _this.unreadList = _this.unreadList.filter((b) => b.name != book.name );
      _this.readList = _this.readList.filter((b) => b.name != book.name );
    }

    _this.updateReadingList = function(list, token) {
      readingListResource.update(list, token)
        .then((res) => {

        }, function(error) {
          console.error(error);

        });
    };


  }]);
};
