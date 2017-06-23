/**
* @Author: Ernest
* @Date:   13-Jan-2017
* @Project: MEAN_rush
* @Filename: registerController.js
* @Last modified by:   Ernest
* @Last modified time: 13-Jan-2017
* @License: MIT
*/


app.controller('RegisterController', ['$scope', '$http', '$sessionStorage', 'authentification', "$location", function($scope, $http, $sessionStorage, authentification, $location){

    $scope.login = function(data)
    {
        if(data.email.match(/\S+@\S+\.\w{1,4}/))
        {
            return $http({
                method: "POST",
                url: "/login",
                data: data
            }).then(function(data){
                authentification.saveToken(data.data.token)
                $location.path('home');
                console.log("yeah");
            }), function(err){
                console.log(err);
            }
        }
        else
        console.log("email invalid");
    };

    $scope.register = function(data)
    {
        if(data.name && data.email.match(/\S+@\S+\.\w{1,4}/) && data.password == data.password_confirmation && data.password != "")
        {
            return $http({
                method: "POST",
                url:"/register",
                data: data
            }).then(function(data){
                authentification.saveToken(data.data.token);
                $location.path('home')
            })
        }
        else
        console.log("param invalid");
    }
    $scope.logout = function()
    {
        authentification.logout();
        $location.path('login');
    }
}]);
