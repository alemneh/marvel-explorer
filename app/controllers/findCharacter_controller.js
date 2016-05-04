'use strict';

module.exports = function(app) {
  app.controller('FindCharacterController', ['httpService', function(httpService) {
    const _this = this;
    const requestCharacter = httpService('characters');
    // const requestComics
    _this.showResults = false;
    _this.queries = [];
    _this.num = 0;
    _this.questions = [
      'I want a character with gender:',
      'I want a character who first appears in:',
      'I want a character who has appeared in:',
      'I want a character who\'s identity is:',
      'I want a character who\'s hair is:',
      'I want a character who weighs:',
      'I want a character from:'
    ];
    _this.options = [
      ['thing1', 'thing2', 'thing3', 'thing4'],
      ['other1', 'other2', 'other3', 'other4'],
      ['tres1', 'tres2', 'tres3', 'tres4']
    ];

    _this.nxtQ = (num, option) => {
      if (num == 6) return;
      _this.queries[num] = option;
      _this.num = _this.num += 1;
      console.log(_this.num);
    }

    _this.back = (num) => {
      if (num == 0) return;
      _this.num = _this.num -= 1;
      console.log(_this.num);
    }

    _this.getResults = (num, option) => {
      _this.queries[num] =  option;
      _this.showResults = true;
    }
  }]);

  app.directive('question', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'views/question.html'
    }
  });

  app.directive('questionResults', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'views/question_results.html'
    }
  });
}
