module.exports = function(app) {
  app.controller('ComicBookController', ['ErrorService', 'httpService', '$window',
function(ErrorService, httpService, $window) {
  const _this = this;
  const addComicToListResource = httpService('users/comics');
  _this.character = JSON.parse($window.localStorage.character);


  _this.getComicBook = function() {
    _this.comicBook = JSON.parse($window.localStorage.comicBook);
  }

  _this.addBook = function(comic, $index) {
    addComicToListResource.createComic(comic).then((res) => {
      $('#success').removeClass('hide');
    }, function(error) {
      console.log(error);
      if(error.statusText == 'Unauthorized') {
        $('#success').removeClass('hide').addClass('alert-danger')
          .html('<strong>Login to save comic!</strong>');
      }
    });
  };
}])
}
