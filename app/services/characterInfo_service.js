module.exports = function(app) {
  app.factory('CharacterService', [function() {
    const cache = {};

    this.set = function(character) {
      cache = character;
    };

    this.get = function() {
      return cache;
    };

  }]);
};
