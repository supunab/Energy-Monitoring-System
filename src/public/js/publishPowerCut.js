var app = angular.module('energy-monitor',[]);

app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

app.controller("PowerCutController",[
   '$scope',
    '$http',
    function($scope, $http ){
        $scope.areas = [];
        $scope.description = "";
        $scope.from = "";
        $scope.to = "";
        $scope.newArea = "";

        // Load all the areas from the database
        $scope.allAreas = [];
        $http.get('/areas').success(function(data){
            for(var i=0; i <data.length; i++){
                $scope.allAreas.push(data[i].name);
            }
        });

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