module.exports = function(app) {
  app.factory('ComicBookService', [function() {
    var cache = {};

    function ComicBookService() {};

    ComicBookService.prototype.set = function(comicBook) {
      console.log(comicBook);
      cache = comicBook;
      console.log(cache);
    };

    ComicBookService.prototype.get = function() {
      return cache || null;
    };

    return function() {
      return new ComicBookService();
    }

  }]);
};
