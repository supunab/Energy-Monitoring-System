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

        // Load all the areas from the database
        $scope.allAreas = [];

        $http.get('/areas').success(function(data){
            for(var i=0; i <data.length; i++){
                $scope.allAreas.push(data[i].name);
            }
        });

        $scope.addNewArea = function(){
            console.log($scope.start);
            if(!$scope.newArea || $scope.newArea===""){return;}

            $scope.areas.push($scope.newArea);

            $scope.newArea = "";
        };

        $scope.removeArea = function(index){
            $scope.areas.splice(index,1);
        };

        $scope.publish = function(){
            if ($scope.areas.length === 0){return ;}

            var startDate = new Date(String($scope.start_d));
            console.log(startDate);
            var startTime = new Date(String($scope.start_t));

            var endDate = new Date(String($scope.to_d));
            var endTime = new Date(String($scope.to_t));

            startDate = startDate.getFullYear()+"-"+(startDate.getMonth()+1)+"-"+startDate.getDate()+" "+startTime.getHours()+":"+startTime.getMinutes();
            console.log(startDate);
            endDate = endDate.getFullYear()+"-"+(endDate.getMonth()+1)+"-"+endDate.getDate()+" "+endTime.getHours()+":"+endTime.getMinutes();
            console.log(endDate);

            // Todo - Validate dates
            // Create a JSON object to send
            var powerCut = {
                start_date : startDate,
                end_date : endDate,
                description : $scope.description,
                areas : $scope.areas
            };

            console.log(powerCut);

            // Send request
            $http.post("/newpowercut", powerCut);

        };

    }
]);