module.exports = function(app) {
<<<<<<< HEAD
  app.factory('httpService', ['$http', function($http) {
=======
  app.factory('httpService', ['$http', 'AuthService', function($http, AuthService) {
>>>>>>> 8440edb809dbec3cb1570fc4362e7c7522e9e0a3
    const mainRoute = 'http://54.201.60.218/';

    function Resource(resourceName) {
      this.resourceName = resourceName;
    }

    Resource.prototype.getAll = function() {
      return $http.get(mainRoute + this.resourceName);
    };

<<<<<<< HEAD
    Resource.prototype.getOne = function(id) {
<<<<<<< HEAD
      return $http.get(mainRoute + this.resourceName, {
=======
      return $http.get(mainRoute + this.resourceName + id + '/comics', {
=======
    Resource.prototype.getOne = function(id, token) {
      return $http.get(mainRoute + this.resourceName + '/' + id, {
>>>>>>> d589c19f330f15b860238e55cab8fcc3df2ae95c
>>>>>>> 4ba8b3872c172427e2cb07184f4c7b437d5d4325
        headers: {
          Authorization: 'Token ' + AuthService.getToken()
        }
      });
    };

    Resource.prototype.create = function(data) {
      return $http.post(mainRoute + this.resourceName, data);
    };


<<<<<<< HEAD
    Resource.prototype.update = function(user) {
      return $http.put(mainRoute + this.resourceName , user, {
=======
    Resource.prototype.update = function(id, token) {
      return $http.put(mainRoute + this.resourceName + '/' + id, {
>>>>>>> 4ba8b3872c172427e2cb07184f4c7b437d5d4325
        headers: {
          Authorization: 'Token ' + AuthService.getToken()
        }
      });
    };

    Resource.prototype.remove = function(id, token) {
      return $http.delete(mainRoute + this.resourceName + '/' + id, {
        headers: {
          Authorization: 'Token ' + AuthService.getToken()
        }
      });
    }


    return function(resourceName) {
      return new Resource(resourceName);
    };

  }]);
}
