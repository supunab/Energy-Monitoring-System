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
        $scope.start = "";
        $scope.to = "";
        $scope.newArea = "";

        // Load all the areas from the database
        $scope.allAreas = [];
        $http.get('/areas').success(function(data){
            for(var i=0; i <data.length; i++){
                $scope.allAreas.push(data[i].name);
            }
        });

        // Get all areas
        $http.get('/areas').success(function(data){
            $scope.allAreas.push(data);
        });

        $scope.addNewArea = function(){
            console.log($scope.from);
            if(!$scope.newArea || $scope.newArea===""){return;}

            $scope.areas.push($scope.newArea);

            $scope.newArea = "";
        };

        $scope.removeArea = function(index){
            $scope.areas.splice(index,1);
        };

        $scope.publish = function(){
            if ($scope.areas.length === 0){return ;}

            // Todo - Validate dates
            // Create a JSON object to send
            var powerCut = {
                start_date : $scope.start,
                end_date : $scope.to,
                description : $scope.description,
                areas : $scope.areas
            };

            // Send request
            $http.post("/newpowercut", powerCut);

        };

    }
]);