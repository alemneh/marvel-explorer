'use strict';

module.exports = function(app) {
  app.controller('FindCharacterController', ['httpService', 'CharacterService', '$location', '$window', '$scope', '$route',
  function(httpService, CharacterService, $location, $window, $scope, $route) {
    // Internal Variables
    const saveCharacter = CharacterService();
    const httpReq = httpService('herofinder');
    const _this = this;
    var results = [];

    // Controller Variables
    _this.notLoaded = true;
    _this.filterOpts = [];
    _this.showResults = false;
    _this.onLeft = true;
    _this.onRight = false;
    _this.filtered = [];
    _this.random20;
    _this.num = 0;
    _this.options = [
      ['No Preference', 'Male', 'Female', 'Unknown'],
      ['No Preference', 'Dark', 'Bronze', 'Silver', 'Golden', 'Modern'],
      ['No Preference'],
      ['No Preference']
    ]

    _this.init = () => {
      httpReq.getOne('random20')
        .then(res => {
          _this.random20 = res.data;
          // _this.random20 = _this.random20.slice(0, 20);
          _this.random20 = _this.random20.map(char => {
            if (char.abilities == 'Unrevealed' || 'None') char.abilities = '';
            if (char.powers == 'Unrevealed' || 'None') char.powers = '';
            char.image_medium = char.thumbnail.slice(0, char.thumbnail.length - 4) + '/portrait_fantastic.jpg';
            return char;
          });

          endScroll(_this.random20, 'random20-images');
        });

      httpReq.getAll()
        .then(res => {
          results = res.data;
          _this.notLoaded = false;
          results = results.map(char => {
            if (char.abilities == 'Unrevealed' || 'None') char.abilities = '';
            if (char.powers == 'Unrevealed' || 'None') char.powers = '';
            char.image_medium = char.thumbnail.slice(0, char.thumbnail.length - 4) + '/portrait_fantastic.jpg';
            return char;
          });
        });
    }

    _this.reloadPage = function() {
      $route.reload();
    }

    var filter0 = (num, option) => {
      // _this.filtered = [{image_medium: 'http://x.annihil.us/u/prod/marvel/i/mg/3/40/4bb4680432f73/portrait_fantastic.jpg'}]
      if (option == undefined) return _this.filtered = results;
      if (option == 'No Preference') return _this.filtered = results;
      _this.filtered = results.filter(char => {
        return (char.gender == option);
      });
    }

    var filter1 = (num, option) => {
      if (option == 'No Preference') {
        _this.filtered.forEach(char => {
          if (!_this.options[2].includes(char.identity_status)) _this.options[2].push(char.identity_status);
        });
        return _this.filtered;
      }

      _this.filtered = _this.filtered.filter(char => {
        return char[option.toLowerCase()];
      }).map(char => {
        if (!_this.options[2].includes(char.identity_status)) _this.options[2].push(char.identity_status);
        return char;
      });

      if (_this.options[2].length < 3) _this.num += 1;

      if (_this.filtered.length <= 20) {
        return _this.getResults();
      }
    }

    var filter2 = (num, option) => {
      if (option == 'No Preference') {
        _this.filtered.forEach(char => {
          if (char.citizenship == 'U.S.A.') {
            if (!_this.options[3].includes('U.S.A.')) _this.options[3].push('U.S.A.');
          } else {
            if (!_this.options[3].includes('Other')) _this.options[3].push('Other');
          }
        });
        return _this.filtered;
      }

      _this.filtered = _this.filtered.filter(char => {
        return char.identity_status == option;
      }).map(char => {
        if (char.citizenship == 'U.S.A.') {
          if (!_this.options[3].includes('U.S.A.')) _this.options[3].push('U.S.A.');
        } else {
          if (!_this.options[3].includes('Other')) _this.options[3].push('Other');
        }
        return char;
      });

      if (_this.options[3].length < 3) _this.num += 1;

      if (_this.filtered.length <= 20) {
        return _this.getResults();
      }
    }

    var filter3 = (num, options) => {
      if (options[3] == 'No Preference') return _this.filtered;

      _this.filtered = _this.filtered.filter(char => {
        if (options[3] == 'U.S.A.') return char.citizenship == 'U.S.A.';
        return char.citizenship != 'U.S.A.';
      });

      // if (_this.filtered.length <= 20 || _this.options[num].length < 3) {
      //   return _this.getResults();
      // }
    }

    _this.lastFilter = (num, option) => {
      if (option == undefined) {
        _this.getResults();
      }
      _this.filterOpts[num] =  option;
      _this.filterList[num](num, option);
      _this.getResults();
    }

    _this.filterList = [filter0, filter1, filter2, filter3];

    _this.questions = [
      'What is their gender?',
      'What era did they first appear in?',
      'Do you want a character who\'s identity is:',
      'What is their citizenship?'
      // 'What is the color of their hair?',
      // 'How many publications have they appeared in?',
      // 'What weight-class are they?',
    ];

    _this.nxtQ = (num, option) => {
      if (num == _this.questions.length-1) return;
      if (option == undefined) {
        _this.num = _this.num += 1;
        return _this.filtered;
      }
      _this.filterOpts[num] = option;
      _this.filterList[num](num, option);
      _this.num = _this.num += 1;
    }

    // _this.back = (num) => {
    //   if (num == 0) return;
    //   _this.num = _this.num -= 1;
    //   console.log(_this.num);
    // }

    _this.getResults = () => {
      // TODO: setup a #/find-charater/results route
      if (!_this.filtered.length) _this.filtered = results;
      _this.filtered = _this.filtered.length >= 20 ? _this.filtered.slice(0, 20) : _this.filtered;
      _this.showResults = true;
      console.log(_this.filtered);
      endScroll(_this.filtered, 'character-images');
    }

    _this.selectCharacter = (character) => {
      saveCharacter.set(character);
      $location.path('/character');
    }

    function endScroll(array, divId) {
      var scroll = document.getElementById(divId);
      var inner = $(`#${divId}`);
      var totalWidth = resultWidth(array);
      var eleWidth = $window.innerWidth - 30;
      inner.scroll(function() {
        $('.character-popup').fadeOut('fast');
        var scrollAmount = inner.scrollLeft() + eleWidth;
        if (inner.scrollLeft() <= 35) {
          _this.onLeft = true;
        } else if (scrollAmount >= totalWidth - 35) {
          _this.onRight = true;
        } else {
          _this.onRight = false;
          _this.onLeft = false;
        }
        $scope.$digest();
      });
    }

    function resultWidth(array) {
      return ((168 + 10) * array.length);
    }

    _this.characterClick = function(id, e) {
      var mouseX, mouseY;
      mouseX = e.pageX;
      mouseY = e.pageY;
      if ($('#' + id).prev('.character-popup').css('display') === 'block') {
        $('.character-popup').fadeOut('fast');
      } else if ($('#' + id).parent().is(':last-child')) {
        $('.character-popup').fadeOut('fast');
        $('#' + id).prev('.character-popup').css({'top':`${mouseY}px`,'left':`${mouseX - 225}px`}).fadeToggle('fast');
      } else {
        $('.character-popup').fadeOut('fast');
        $('#' + id).prev('.character-popup').css({'top':`${mouseY}px`,'left':`${mouseX}px`}).fadeToggle('fast');
      }
    }

    _this.closePopup = function() {
      $('.character-popup').fadeOut('fast');
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
