module.exports = function(app) {
  app.controller('CharacterController', ['ErrorService', 'httpService', 'CharacterService',
  function(ErrorService, httpService, CharacterService) {
    const _this = this;
    const comicsList = httpService('');
    const getCharacter = CharacterService();


    _this.comics;
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
    // _this.getComics = function(character) {
    //   comicsList.getOne(character._id).then((res) => {
    //     console.log(res);
    //     _this.comics = res.data;
    //   });
    // };

    _this.addBook = function(comic) {
      comicsList.update(comic).then((res) => {
        console.log(res);
      }, function(error) {
        console.log(error);
      });
    };

  }]);
};
