/**
* @Author: Ernest
* @Date:   15-Jan-2017
* @Project: MEAN_rush
* @Filename: post.service.js
* @Last modified by:   Ernest
* @Last modified time: 15-Jan-2017
* @License: MIT
*/


app.factory('post', function($http, $window, $sessionStorage, $location){
    return {
        listPost : function(callback){
                $http({
                method: 'GET',
                url: '/post',
            }).then(function(data){
                    callback(data);
            })
        },
        removePost : function(data)
        {
            console.log(data);
            $http({
                method: 'DELETE',
                url: '/post/' + data._id,
                data : data
            })
        }
    }
});
