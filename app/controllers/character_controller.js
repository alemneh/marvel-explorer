module.exports = function(app) {
  app.controller('CharacterController', ['ErrorService', 'httpService', 'CharacterService',
  function(ErrorService, httpService, CharacterService) {
    const _this = this;
    const comicsList = httpService('');

    _this.character = CharacterService.get();
    _this.comics;

    _this.getComics = function(character) {
      comicsList.getOne(character._id).then((res) => {
        console.log(res);
        _this.comics = res.data;
      });
    };
  }]);
};
