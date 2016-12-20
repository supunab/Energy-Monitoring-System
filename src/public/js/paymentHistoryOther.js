let app = angular.module("energy-monitor", []);

app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

app.controller("PaymentHistoryOtherCtrl",[
    "$scope",
    "$http",
    function($scope, $http){
        $scope.records = [];

        $scope.updateTable = function(){
            // check connetion account no
            $http.get("/checkConnection/"+$scope.connectionId)
                .success(function(data){

                if (data.available){
                    // validated account_no

                    let start = new Date($scope.start_d);
                    let end = new Date($scope.end_d);

                    start = start.getFullYear() +"-"+(start.getMonth()+1)+"-"+start.getDate();
                    end = end.getFullYear()+"-"+(end.getMonth()+1)+"-"+end.getDate();

                    let sendJSON = {
                        connections : [$scope.connectionId],
                        start_date : start,
                        end_date : end
                    };

                    $http.get("/paymentHistory/getHistory/"+encodeURIComponent(JSON.stringify(sendJSON)))
                        .success(function(data){
                            angular.copy(data, $scope.records);
                        });

                }else{
                    alert("Please enter a valid account number for a connection.")
                }
            })
        }

    }
]);