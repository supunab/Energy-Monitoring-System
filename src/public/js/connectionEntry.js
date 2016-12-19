let app = angular.module('energy-monitor',[])

$("select").select2();

app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

app.controller("ConnectionEntryCtrl",[
    "$scope",
    "$http",
    function($scope, $http){
        $scope.districts = ["Kandy", "Colombo", "Rathnapura", "Badulle"];

        $scope.connectionTypes = ["Temple", "School", "Government", "Home", "Industry"];

        // Load all the areas from the database
        $scope.allAreas = [];

        $http.get('/areas').success(function(data){
            for(var i=0; i <data.length; i++){
                $scope.allAreas.push(data[i].name);
            }
        });

        $scope.publish = function(){
            let data = {
                account_no : $scope.accountNo,
                address1 : $scope.address1,
                address2 : $scope.address2,
                addressStreet : $scope.addressStreet,
                city : $scope.city,
                district : $scope.selDistrict,
                connection_type : $scope.connectionType,
                area : $scope.selArea,
                customer_id : "941401406"
            };

            console.log(data);

            $http.post('/addNewConnection/',data)
                .success(function (data) {
                    console.log("added successfully!");
                })
                .error(function(err){
                    console.log("An error occured : "+err);
                })
        };
    }
]);