let app = angular.module("energy-monitor", []);

$('select').select2();

function getFixedDate(dateString){
    let temp = dateString.split(" ");
    let date = temp[0];
    let year = temp[2];
    let month = 0;

    temp = temp[1].replace(",","");

    switch(temp){
        case "January":
            month = 1;
            break;
        case "February":
            month = 2;
            break;
        case "March":
            month = 3;
            break;
        case "April":
            month = 4;
            break;
        case "May":
            month = 5;
            break;
        case "June":
            month = 6;
            break;
        case "July":
            month = 7;
            break;
        case "August":
            month = 8;
            break;
        case "September":
            month = 9;
            break;
        case "October":
            month = 10;
            break;
        case "November":
            month = 11;
            break;
        case "December":
            month = 12;
            break;
    }

    return year+"-"+month+"-"+date;
}

app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

app.controller("PaymentHistoryCtrl",[
    "$scope",
    "$http",
    function($scope, $http){
        // Assume customer id is already known (Should take from the login details)
        let customerid = user_id;

        let selectedConnections = {};

        $scope.start_d = new Date(2010,1,1);
        $scope.end_d = new Date();

        $scope.updateSelected = function(){
            selectedConnections.connections = [123456];
        };

        $scope.connections = [];
        $scope.records = [];

        $http.get("/paymentHistory/getConnections/"+customerid)
            .success(function(data){
            for(let i=0; i < data.length; i++){
                $scope.connections.push(data[i].account_no);
            }

            })
            .error(function(err){
                console.log(err);
            });


        $scope.updateTable = function(){
            let start = new Date($scope.start_d);
            let end = new Date($scope.end_d);

            start = start.getFullYear() +"-"+(start.getMonth()+1)+"-"+start.getDate();
            end = end.getFullYear()+"-"+(end.getMonth()+1)+"-"+end.getDate();

            let selectedCons = $scope.selectedConnections;

            // To retrive all the connections if no connection is selected
            if (typeof selectedCons === "undefined" || selectedCons.length === 0){
                selectedCons = ['true'];
            }

            // if (typeof $scope.selectedConnections === "undefined")
            selectedConnections = {
                connections : selectedCons,
                start_date : start,
                end_date : end
            };

            $http.get("/paymentHistory/getHistory/"+encodeURIComponent(JSON.stringify(selectedConnections)))
                .success(function(data){
                    angular.copy(data, $scope.records);
                });
        };

    }
]);