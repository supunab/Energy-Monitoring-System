var app = angular.module("energy-monitor", []);

function getFixedDate(dateString){
    var temp = dateString.split(" ");
    var date = temp[0];
    var year = temp[2];
    var month = 0;

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
<<<<<<< 209a04531f16c788cb9a7d0214f0560654134159
        // Assume customer id is already known (Should take from the login details)
        var customerid = '1';
=======
>>>>>>> Completed html payment history for registered view


        // Assume customer id is already known (Should take from the login details)
        var customerid = '1';

        // dummy data
        $scope.records = [
        {
            connection : "local",
            date : "test date",
            amount : "Rs. 1000"
        },
        {
            connection : "single",
            date : "test ddsate",
            amount : "Rs. 1000122"
        },
        {
            connection : "lsdaocal",
            date : "test dasdate",
            amount : "Rs. 100330"
        }
            ];

        $scope.connections = ['test1', 'connection 2', 'connection 3'];
<<<<<<< 209a04531f16c788cb9a7d0214f0560654134159
=======




>>>>>>> Completed html payment history for registered view
    }
]);