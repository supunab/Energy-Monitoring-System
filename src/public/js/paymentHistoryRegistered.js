var app = angular.module("energy-monitor", []);

app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

app.controller("PaymentHistoryCtrl",[
    "$scope",
    "$http",
    function($scope, $http){
        $scope.test = "Hello World";
    }
]);