module.exports = function(app) {
  app.controller('CharacterController', ['ErrorService', 'httpService', 'CharacterService', 'ComicBookService', '$location',
  function(ErrorService, httpService, CharacterService, ComicBookService, $location) {
    const _this = this;
    const comicsListResource = httpService('herofinder');
    const addComicToListResource = httpService('users/comics');
    const getCharacter = CharacterService();
    const getComicBook = ComicBookService();


    _this.comics = [{name: 'Spiderman', marvel_id: 1009468, year: 1944}];
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

    _this.getCharacter = function() {
      _this.character = getCharacter.get();
      console.log(_this.character);
    }

    _this.getComicBook = function(comicBook) {
      getComicBook.set(comicBook);
      $location.path('/comic-book');
    }

    _this.getComics = function(character) {
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
        console.log(error.statusText);
        if(error.statusText == 'Unauthorized') {
          console.log('hit');
          $('#'+btn).removeClass('hide').addClass('alert-danger')
            .html('<strong>Login to save comic!</strong>');
        }
      });
    };

  }]);
};
