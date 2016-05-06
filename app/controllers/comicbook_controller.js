module.exports = function(app) {
  app.controller('ComicBookController', ['ErrorService', 'httpService', 'CharacterService',
function(ErrorService, httpService, CharacterService) {
  const _this = this;
  const getComicBook = CharacterService();
  _this.comicBook;

  _this.getComicBook = function() {
    _this.comicBook = getComicBook.get();
    console.log(_this.comicBook);
  }
}])
}
