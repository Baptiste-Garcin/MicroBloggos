


app.controller('UsersController', ['$scope', '$http', '$location', '$sessionStorage', 'authentification', 'users', function($scope, $http, $location, $sessionStorage, authentification, users){

    users.listUsers(function(data){
        $scope.users = data.data

        for (var i = 0; i < $scope.users.length; i++)
        {
            $scope.users[i].created_at = $scope.users[i].created_at.slice(0, 10);
            $scope.users[i].created_at = $scope.users[i].created_at.split('-');
            $scope.users[i].created_at = $scope.users[i].created_at[2] + "/" + $scope.users[i].created_at[1] + "/" + $scope.users[i].created_at[0]
        }
        console.log($scope.users);
    })

}]);
