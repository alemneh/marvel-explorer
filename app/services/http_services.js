module.exports = function(app) {
  app.factory('httpService', ['$http', function($http) {
    const mainRoute = 'http://54.201.60.218/';

    function Resource(resourceName) {
      this.resourceName = resourceName;
    }

    Resource.prototype.getAll = function(token) {
      return $http.get(mainRoute + this.resourceName, {
        headers: {
          token: token
        }
      });
    };

    Resource.prototype.getOne = function(id, token) {
      return $http.get(mainRoute + this.resourceName + '/' + id, {
        headers: {
          token: token
        }
      });
    };

    Resource.prototype.create = function(data) {
      return $http.post(mainRoute + this.resourceName, data);
    };


    Resource.prototype.update = function(id, token) {
      return $http.put(mainRoute + this.resourceName + '/' + id, {
        headers: {
          token: token
        }
      });
    };

    Resource.prototype.remove = function(id, token) {
      return $http.delete(mainRoute + this.resourceName + '/' + id, {
        headers: {
          token: token
        }
      });
    }


    return function(resourceName) {
      return new Resource(resourceName);
    };

  }]);
}
