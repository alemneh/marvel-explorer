module.exports = function(app) {
  app.factory('TabService', ['$location', function($location) {
    var currentTab;
    var TabControl = function() {}

    TabControl.prototype.setTab = num => currentTab = num;
    TabControl.prototype.isSet = num => currentTab == num;

    if ($location.$$path == '/') currentTab = 1;
    if ($location.$$path == '/profile') currentTab = 2;
    if ($location.$$path == '/find-character') currentTab = 3;
    if ($location.$$path == '/character') currentTab = 4

    return function() {
      return new TabControl();
    };
  }]);
}
