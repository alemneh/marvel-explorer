module.exports = function(app) {
  app.controller('CharacterController', ['ErrorService', 'httpService','$location', '$window',
  function(ErrorService, httpService, $location, $window) {
    const _this = this;
    const comicsListResource = httpService('herofinder');
    const addComicToListResource = httpService('users/comics');
    _this.character = JSON.parse($window.localStorage.character);
    _this.load = false;
    _this.loaded = false;
    _this.loading = true;



    _this.onLoad = function() {
      _this.load = false;
      _this.loading = true;

    };
    _this.loadedDone = function() {
      _this.load = true;
      _this.loaded = true;
      _this.loading = false;
    };





    _this.getComicBook = function(comicBook) {
      $window.localStorage.comicBook = JSON.stringify(comicBook);
      $location.path('/comic-book');
    }

    _this.getComics = function(character) {
      _this.onLoad();
      comicsListResource.getOneSubResource(character.marvel_id, 'comics').then((res) => {
        _this.loadedDone();
        _this.comics = res.data;
      });
    };

    _this.addBook = function(comic, $index) {
      var btn = 'btn'+$index;
      addComicToListResource.createComic(comic).then((res) => {

        $('#'+btn).removeClass('hide');
      }, function(error) {
        console.log(error);
        if(error.statusText == 'Unauthorized') {
          $('#'+btn).removeClass('hide').addClass('alert-danger')
            .html('<strong>Login to save comic!</strong>');
        }
      });
    };

  }]);
};
