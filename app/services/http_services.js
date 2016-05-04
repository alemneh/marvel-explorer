module.exports = function(app) {
  app.factory('httpService', ['$http', 'AuthService', function($http, AuthService) {
    const mainRoute = 'http://54.201.60.218/';

    function Resource(resourceName) {
      this.resourceName = resourceName;
    }

    Resource.prototype.getAll = function(id) {
      return $http.get(mainRoute + this.resourceName + id + '/comics' , {
        headers: {
          Authorization: 'Token ' + AuthService.getToken()
        }
      });
    };

    Resource.prototype.getOne = function(data, token) {
      return $http.get(mainRoute + this.resourceName + '/' + data._id, {
        headers: {
          Authorization: 'Token ' + AuthService.getToken()
        }
      });
    };

    Resource.prototype.create = function(data) {
      return $http.post(mainRoute + this.resourceName, data);
    };


    Resource.prototype.update = function(data, token) {
      return $http.put(mainRoute + this.resourceName + '/' + data._id, {
        headers: {
          Authorization: 'Token ' + AuthService.getToken()
        }
      });
    };

    Resource.prototype.remove = function(data, token) {
      return $http.delete(mainRoute + this.resourceName + '/' + data._id, {
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
