module.expots = function(app) {
  app.factory('httpService', ['$http', function($http) {
    const mainRoute = 'http://localhost:3000/';

    function resource(resourceName) {
      this.resourceName = resourceName;
    }

    resource.prototype.get = function(token) {
      return $http.get(mainRoute + this.resourceName, {
        headers: {
          token: token
        }
      });
    };

    resource.prototype.create = function(data) {
      return $http.post(mainRoute + this.resourceName, data);
    };


    resource.prototype.update = function(data, token) {
      return $http.put(mainRoute + this.resourceName + '/' + data._id, {
        headers: {
          token: token
        }
      });
    };

    resource.prototype.remove = function(data, token) {
      return $http.delete(mainRoute + this.resourceName + '/' + data._id, {
        headers: {
          token: token
        }
      });


    return function(resourceName) {
      return new resource(resourceName);
    };

  }]);
}
