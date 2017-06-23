/**
* @Author: Ernest
* @Date:   14-Jan-2017
* @Project: MEAN_rush
* @Filename: mainController.js
* @Last modified by:   Ernest
* @Last modified time: 15-Jan-2017
* @License: MIT
*/

app.controller('MainController', ['$scope', '$http', '$location', 'post', 'authentification', function($scope, $http, $location, post, authentification){

    $scope.isLogged = authentification.isLoggedIn();
    $scope.user = authentification.currentUser();

    post.listPost(function(data){
        $scope.posts = data.data
        for (var i = 0; i < $scope.posts.length; i++)
        {
            var temp = $scope.posts[i].created_at.split('T');
            var date = temp[0].split('-');
            var date = date[2] + "/" + date[1] + "/" + date[0];
            var temp = temp[1].slice(0, 5);
            $scope.posts[i].created_at = temp + " " + date;
        }
    })

    $scope.remove = function(arg)
    {
        post.removePost(arg);
        post.listPost(function(data){
            $scope.posts = data.data
            for (var i = 0; i < $scope.posts.length; i++)
            {
                $scope.posts[i].created_at = $scope.posts[i].created_at.slice(0, 10);
                $scope.posts[i].created_at = $scope.posts[i].created_at.split('-');
                $scope.posts[i].created_at = $scope.posts[i].created_at[2] + "/" + $scope.posts[i].created_at[1] + "/" + $scope.posts[i].created_at[0]
            }
        })
    }

    $scope.post = function(data){
        if(data.length > 140)
            console.log("too long");
        else
        {
            data.author = authentification.currentUser()._id;
            $http({
                method:"POST",
                url: "/post",
                data: data
            }).then(function(data){
                $scope.data.content = "";
                post.listPost(function(data){
                    $scope.posts = data.data
                    for (var i = 0; i < $scope.posts.length; i++)
                    {
                        $scope.posts[i].created_at = $scope.posts[i].created_at.slice(0, 10);
                        $scope.posts[i].created_at = $scope.posts[i].created_at.split('-');
                        $scope.posts[i].created_at = $scope.posts[i].created_at[2] + "/" + $scope.posts[i].created_at[1] + "/" + $scope.posts[i].created_at[0]
                    }
                })
            })
        }
    }
}])
