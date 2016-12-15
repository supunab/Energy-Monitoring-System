var app = angular.module('energy-monitor',[]);

app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

app.controller("PowerCutController",[
   '$scope',
    function($scope){
        $scope.areas = [];
        $scope.description = "";
        $scope.from = "";
        $scope.to = "";
        $scope.newArea = "";

        // Todo - get areas from the database
        $scope.allAreas = ["area1", "sdasa", "feasd", "gegeta", "fadgfaeg"];

        $scope.addNewArea = function(){
            console.log($scope.to);
            if(!$scope.newArea || $scope.newArea===""){return;}

            $scope.areas.push($scope.newArea);

            $scope.newArea = "";
        };

        $scope.removeArea = function(index){
            $scope.areas.splice(index,1);
        }

    }
]);