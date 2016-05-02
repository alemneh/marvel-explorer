module.exports = function(app) {
  app.controller('ProfileController', ['httpService', 'ErrorService', function(httpService) {
    const readingListResource = httpService('readinglist');
    _this.sampleUser = [
      {
        username: 'user', profileImage: 'http://www.corporatetraveller.ca/assets/images/profile-placeholder.gif'
      }
    ];
    const _this = this;
    _this.profileEdit = false;
    var currentInfo = {};
    var newInfo = {};

    _this.setUser = function(user) {
      currentInfo = {
        username: user.username,
        profileImage: user.profileImage
      }
    }
    _this.edit = function(user) {
      _this.profileEdit = true;
      _this.setUser(user);
    };

    _this.cancel = function(user) {

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
