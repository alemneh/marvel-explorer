module.exports = function(app) {
  app.factory('CharacterService', [function() {
    var cache = {};

    function CharacterService() {};

    CharacterService.prototype.set = function(character) {
      // console.log(character);
      cache = character;
    };

    CharacterService.prototype.get = function() {
      return cache || null;
    };

    return function() {
      return new CharacterService();
    }

  }]);
};
