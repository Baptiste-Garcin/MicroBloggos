app.factory('users', function($http, $window, $sessionStorage, $location){
    return {
        listUsers : function(callback){
                $http({
                method: 'GET',
                url: '/user',
            }).then(function(data){
                console.log(data);
                    callback(data);
            })
        }
    }
});
