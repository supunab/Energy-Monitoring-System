let app = angular.module("energy-monitor",[]);

app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

app.controller("AccConCtrl",[
    "$scope",
    "$http",
    function($scope, $http){
        $scope.data = {};

        $scope.loadConnectionReq = function(){
            $http.get("/admin/getConnectionRequest")
                .success(function(data){
                    $scope.data = data[0];
                    console.log(data);
                })
                .error(function(data){
                    console.log("Error !");
                })
        };

        $scope.loadConnectionReq();

        $scope.approve = function(){
            let body = {data : $scope.data,
                accountNumber: $scope.accountNumber};

            $http.post("/admin/acceptConnection", body)
                .success(function(){
                    alert("Success!");
                })

            $scope.loadConnectionReq();
        };

        $scope.disapprove = function(){
            $http.put("/admin/rejectConnection/"+$scope.data.id)
                .success(function(){
                    alert("Success!");
                })
                .error(function(){
                    alert("error");
                });

            $scope.loadConnectionReq();
        }
    }
]);