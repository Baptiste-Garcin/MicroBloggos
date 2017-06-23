/**
* @Author: Ernest
* @Date:   13-Jan-2017
* @Project: MEAN_rush
* @Filename: register.service.js
* @Last modified by:   Ernest
* @Last modified time: 15-Jan-2017
* @License: MIT
*/
app.factory('authentification', function($http, $window, $sessionStorage, $location){
    return {
        saveToken : function(token){
            return $sessionStorage.token = token
        },
        getToken : function(){
            return $sessionStorage.token;
        },
        logout : function(){
            $sessionStorage.$reset();
        },
        isLoggedIn: function(){
            var token = this.getToken();
            var payload;
            if(token)
            {
                payload = token.split(".")[1];
                payload = $window.atob(payload);
                payload = JSON.parse(payload);
                return payload.exp > Date.now() / 1000;
            }
            else
                return false
        },
        currentUser: function(){
            if(this.isLoggedIn()){
                var token = this.getToken();
                var payload = token.split(".")[1];
                payload = $window.atob(payload);
                payload = JSON.parse(payload);
                return {
                    _id: payload._id,
                    name: payload.name,
                    email: payload.email,
                    created_at: payload.created_at
                }
            }
        }
    }
});
