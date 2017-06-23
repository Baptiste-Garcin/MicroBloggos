/**
* @Author: Ernest
* @Date:   14-Jan-2017
* @Project: MEAN_rush
* @Filename: profileController.js
* @Last modified by:   Ernest
* @Last modified time: 15-Jan-2017
* @License: MIT
*/

app.controller('ProfileController', ['$scope', '$http', '$location', '$sessionStorage', 'authentification', function($scope, $http, $location, $sessionStorage, authentification){
    var user = authentification.currentUser();
    $scope.isLogged = authentification.isLoggedIn();
    
    user.created_at = user.created_at.slice(0, 10);
    user.created_at = user.created_at.split('-');
    user.created_at = user.created_at[2] + "/" + user.created_at[1] + "/" + user.created_at[0]
    $scope.user = {name:user.name, email:user.email, created_at:user.created_at, _id:user._id};
}])
