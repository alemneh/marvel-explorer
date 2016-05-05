'use strict';

module.exports = function(app) {
  app.controller('FindCharacterController', ['httpService', '$window', '$scope', function(httpService, $window, $scope) {
    const httpReq = httpService('herofinder');
    const _this = this;
    var token;

    // const requestComics
    _this.showResults = false;
    _this.onLeft = true;
    _this.onRight = false;
    _this.queries = [];
    _this.num = 0;

    _this.results = [];

    _this.init = () => {
      token = $window.localStorage.token;
      httpReq.getAll(token)
        .then(res => {
          _this.results = res.characters;
          console.log(_this.results);
        });
    }
    // _this.questions = [
    //   'I want a character with gender:',
    //   'I want a character who first appears in:',
    //   'I want a character who has appeared in:',
    //   'I want a character who\'s identity is:',
    //   'I want a character who\'s hair is:',
    //   'I want a character who weighs:',
    //   'I want a character from:'
    // ];
    // _this.options = [
    //   ['thing1', 'thing2', 'thing3', 'thing4'],
    //   ['other1', 'other2', 'other3', 'other4'],
    //   ['tres1', 'tres2', 'tres3', 'tres4']
    // ];

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

    // _this.results = [
    //   {name: 'character1', image: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=placeholder1&w=168&h=252'},
    //   {name: 'character2', image: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=placeholder2&w=168&h=252'},
    //   {name: 'character3', image: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=placeholder3&w=168&h=252'},
    //   {name: 'character4', image: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=placeholder4&w=168&h=252'},
    //   {name: 'character5', image: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=placeholder5&w=168&h=252'},
    //   {name: 'character6', image: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=placeholder6&w=168&h=252'},
    //   {name: 'character7', image: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=placeholder7&w=168&h=252'},
    //   {name: 'character8', image: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=placeholder8&w=168&h=252'}
    // ]

    function endScroll() {
      var scroll = document.getElementById('character-images');
      var inner = $('#character-images');
      var ele = $('#results');
      inner.scroll(function() {
        var scrollWidth = inner.scrollLeft() + ele.width();
        if (inner.scrollLeft() <= 15) {
          _this.onLeft = true;
        } else if (inner.scrollLeft() > 15 && inner.scrollLeft() < 30) {
          _this.onLeft = false;
        } else if (scrollWidth >= scroll.scrollWidth - 15) {
          _this.onRight = true;
        } else if (scrollWidth < scroll.scrollWidth - 15 && scrollWidth > scroll.scrollWidth - 30) {
          _this.onRight = false;
        }
        $scope.$digest();
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
