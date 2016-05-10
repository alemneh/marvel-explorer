module.exports = function(app) {
  app.controller('ComicBookController', ['ErrorService', 'httpService', 'ComicBookService', 'CharacterService',
function(ErrorService, httpService, ComicBookService, CharacterService) {
  const _this = this;
  const addComicToListResource = httpService('users/comics');
  const getCharacter = CharacterService();
  const getComicBook = ComicBookService();
  _this.character = getCharacter.get();


  _this.getComicBook = function() {
    _this.comicBook = getComicBook.get();
  }

  _this.addBook = function(comic, $index) {
    addComicToListResource.createComic(comic).then((res) => {
      $('#success').removeClass('hide');
    }, function(error) {
      console.log(error);
    });
  };
}])
}
