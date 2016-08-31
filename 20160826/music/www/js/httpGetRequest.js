/**
 * Created by 87676 on 8/25/2016.
 */
angular.module("app.httpGetRequest",[])
.factory("httpGetRequest",function ($http,$q) {
  function getRequest(url) {
    var delay=$q.defer();
    $http({
      url:url,
      method:"get",
      headers:{"apikey": "adae63a1d3d1265149a8d0e219ed21c2"}
    }).success(function (data) {
      delay.resolve(data);
    });
    return delay.promise;
  }
  return {
    getRequest:getRequest
  }
});
