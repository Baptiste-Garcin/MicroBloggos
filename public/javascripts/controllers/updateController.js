/**
* @Author: Ernest
* @Date:   14-Jan-2017
* @Project: MEAN_rush
* @Filename: updateController.js
* @Last modified by:   Ernest
* @Last modified time: 15-Jan-2017
* @License: MIT
*/



app.controller('UpdateController', ['$scope', '$http', '$location', '$sessionStorage', 'authentification', function($scope, $http, $location, $sessionStorage, authentification){
    var user = authentification.currentUser();
    $scope.isLogged = authentification.isLoggedIn();
    
    user.created_at = user.created_at.slice(0, 10);
    user.created_at = user.created_at.split('-');
    user.created_at = user.created_at[2] + "/" + user.created_at[1] + "/" + user.created_at[0]
    $scope.user = {name:user.name, email:user.email, created_at:user.created_at, _id:user._id};

    $scope.update = function(user){
        if(user.password != user.password_confirmation || !user.email.match(/\S+@\S+\.\w{1,4}/))
            console.log("invalid password");
        else
        {
            $http({
                method: "PATCH",
                url: "/user/" + user._id,
                data:user
            }).then(function(data){
                console.log(data.data.success);
                authentification.saveToken(data.data.token);
                $location.path('profile');
            })
        }
    }
}])
