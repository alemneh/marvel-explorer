module.exports = function(app) {
  app.factory('httpService', ['$http', 'AuthService', function($http, AuthService) {
    const mainRoute = 'http://54.201.60.218/';

    function Resource(resourceName) {
      this.resourceName = resourceName;
    }

    Resource.prototype.getAll = function() {
      return $http.get(mainRoute + this.resourceName);
    };

    Resource.prototype.getOne = function(id, token) {
      return $http.get(mainRoute + this.resourceName + '/' + id, {
        headers: {
          Authorization: 'Token ' + AuthService.getToken()
        }
      });
    };

    Resource.prototype.create = function(data) {
      return $http.post(mainRoute + this.resourceName, data);
    };


    Resource.prototype.update = function(id, token) {
      return $http.put(mainRoute + this.resourceName + '/' + id, {
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
