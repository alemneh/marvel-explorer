module.exports = function(app) {
  app.controller('ComicBookController', ['ErrorService', 'httpService', 'CharacterService',
function(ErrorService, httpService, CharacterService) {
  const _this = this;
  const addComicToListResource = httpService('users/comics');
  const getComicBook = CharacterService();
  _this.comicBook;

  _this.getComicBook = function() {
    _this.comicBook = getComicBook.get();
    console.log(_this.comicBook);
  }

  _this.addBook = function(comic) {
    addComicToListResource.create(comic).then((res) => {
      console.log(res);
    }, function(error) {
      console.log(error);
    });
  };
}])
}
