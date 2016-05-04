module.exports = function(app) {
  app.factory('httpService', ['$http', function($http) {
    const mainRoute = 'http://localhost:3000/';

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

    Resource.prototype.getOne = function(data, token) {
      return $http.get(mainRoute + this.resourceName + '/' + data._id, {
        headers: {
          token: token
        }
      });
    };

    Resource.prototype.create = function(data) {
      return $http.post(mainRoute + this.resourceName, data);
    };


    Resource.prototype.update = function(data, token) {
      return $http.put(mainRoute + this.resourceName + '/' + data._id, {
        headers: {
          token: token
        }
      });
    };

    Resource.prototype.remove = function(data, token) {
      return $http.delete(mainRoute + this.resourceName + '/' + data._id, {
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
