/**
* @Author: Ernest
* @Date:   12-Jan-2017
* @Project: MEAN_rush
* @Filename: angCtrl.js
* @Last modified by:   Ernest
* @Last modified time: 15-Jan-2017
* @License: MIT
*/


var app = angular.module('MicroBloggos', ['ngStorage', "ngRoute"]);

app.config(function($routeProvider){
    $routeProvider.when('/', {templateUrl: "./views/login.html",
                                controller: 'RegisterController'})
                    .when('/register', {templateUrl: "./views/register.html",
                                        controller: 'RegisterController'})
                    .when('/home', {templateUrl: "./views/home.html",
                                    controller: 'MainController'})
                    .when('/profile', {templateUrl: "./views/profile.html",
                                    controller: 'ProfileController'})
                    .when('/update', {templateUrl: "./views/update.html",
                                    controller: 'UpdateController'})
                    .when('/users', {templateUrl: "./views/users.html",
                                    controller: 'UsersController'})
                    .otherwise({redirectTo:'/'});
});

app.run(['$rootScope', '$location', 'authentification', function($rootScope, $location, authentification){
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute){
        if(($location.path() === '/home' || $location.path() === '/profile' || $location.path() === '/update' || $location.path() === '/users') && !authentification.isLoggedIn())
            $location.path('');
        else if (($location.path() === '/' || $location.path() === '/register') && authentification.isLoggedIn())
        {
            $location.path('home');
        }
    })
}]);

app.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});
