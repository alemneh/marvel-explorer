module.exports = function(app) {
  app.factory('httpService', ['$http', 'AuthService', function($http, AuthService) {
    // nadia route
    // const mainRoute = 'http://54.201.60.218/';

    // paul route
    const mainRoute = 'http://54.201.56.235/';

    function Resource(resourceName) {
      this.resourceName = resourceName;
    }

    Resource.prototype.getAll = function() {
      return $http.get(mainRoute + this.resourceName);
    };


    Resource.prototype.getOne = function(id) {
      return $http.get(mainRoute + this.resourceName + (id ? '/' + id : ''), {
        headers: {
          Authorization: 'Token ' + AuthService.getToken()
        }
      });
    };

    Resource.prototype.getOneSubResource = function(id, subResource) {
      return $http.get(mainRoute + this.resourceName + '/' + id + '/' + subResource, {
        headers: {
          Authorization: 'Token ' + AuthService.getToken()
        }
      });
    }

    Resource.prototype.create = function(data) {
      return $http.post(mainRoute + this.resourceName, data);
    };

    Resource.prototype.createComic = function(data) {
      return $http.post(mainRoute + this.resourceName, data, {
        headers: {
          Authorization: 'Token ' + AuthService.getToken()
        }
      });
    };

    Resource.prototype.update = function(data, id) {
      console.log(data);
      return $http.put(mainRoute + this.resourceName + (id ? '/' + id : ''), data, {
        headers: {
          Authorization: 'Token ' + AuthService.getToken()
        }
      });
    };

    Resource.prototype.remove = function(id) {
      return $http.delete(mainRoute + this.resourceName + (id ? '/' + id : ''), {
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
