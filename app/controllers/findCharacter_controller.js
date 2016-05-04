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
      endScroll();
    }

    _this.results = [
      {name: 'comic1', image: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=placeholder1&w=168&h=252'},
      {name: 'comic2', image: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=placeholder2&w=168&h=252'},
      {name: 'comic3', image: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=placeholder3&w=168&h=252'},
      {name: 'comic4', image: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=placeholder4&w=168&h=252'},
      {name: 'comic5', image: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=placeholder5&w=168&h=252'},
      {name: 'comic6', image: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=placeholder6&w=168&h=252'},
      {name: 'comic7', image: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=placeholder7&w=168&h=252'},
      {name: 'comic8', image: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=placeholder8&w=168&h=252'}
    ]

    function endScroll() {
      var ele = $('#results');
      var inner = $('#comic-covers');

      $('#results .well').scroll(function() {
        console.log($('#results .well').scrollLeft() + ele.width(), inner.width());
        if($('#results .well').scrollLeft() + ele.width() == inner.width()) {
          alert("end!");
        }
      });
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
