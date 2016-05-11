module.exports = function(app) {
  app.controller('ComicBookController', ['ErrorService', 'httpService', 'ComicBookService', 'CharacterService',
function(ErrorService, httpService, ComicBookService, CharacterService) {
  const _this = this;
  const addComicToListResource = httpService('users/comics');
  const getCharacter = CharacterService();
  const getComicBook = ComicBookService();
  _this.character = getCharacter.get();
  _this.comicBook;

  _this.getComicBook = function() {
    _this.comicBook = getComicBook.get();
    console.log(_this.comicBook);
  }

  _this.addBook = function(comic) {
    console.log(comic);
    addComicToListResource.createComic(comic).then((res) => {
      console.log(res);
    }, function(error) {
      console.log(error);
    });
  };
}])
}
