var app = angular.module('MunkaidoAPP', ['ngRoute']);

app.run(function($rootScope){
    $rootScope.title = 'Munkaidő App'
});

app.config(function($routeProvider){
    $routeProvider
    .when('/', {
        templateUrl: 'Views/home.html',
        controller: 'homeCtrl'
    })
    .when('/alkalmazottak', {
        templateUrl: 'Views/alkalmazottak.html',
        controller: 'alkalmazottakCtrl'
    })
    .when('/munkaidok', {
        templateUrl: 'Views/munkaidok.html',
        controller: 'munkaidoCtrl'
    })
    .when('/fizeteseloleg', {
        templateUrl: 'Views/fizeteseloleg.html',
        controller: 'fizeteselolegCtrl'
    })
    .otherwise(
        { redirectTo: '/' }
    )
});