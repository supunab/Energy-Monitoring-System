let app = angular.module('energy-monitor', []);

$("select").select2();

app.config(function ($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

app.controller("ConnectionEntryCtrl", [
    "$scope",
    "$http",
    function ($scope, $http) {
        $scope.districts = "Kandy.Matale.Nuwara Eliya.Ampara.Batticaloa.Trincomalee.Anuradhapura.Polonnaruwa.Jaffna.Kilinochchi.Mannar.Mullaitivu.Vavuniya".split(".");

        $scope.connectionTypes = ['Enterprises', 'Houses', 'Government Organizations', 'Religious Establishments'];

        // Load all the areas from the database
        $scope.allAreas = [];

        $http.get('/areas').success(function (data) {
            for (let i = 0; i < data.length; i++) {
                $scope.allAreas.push(data[i].name);
            }
        });

        // Load all the customers from the database
        $scope.allCustomers = [];

        $http.get("/api/get/customers")
            .success(function (data) {
                angular.copy(data, $scope.allCustomers);
            });


        $scope.publish = function () {
            let data = {
                account_no: $scope.accountNo,
                address1: $scope.address1,
                address2: $scope.address2,
                addressStreet: $scope.addressStreet,
                city: $scope.city,
                district: $scope.selDistrict,
                connection_type: $scope.connectionType,
                area: $scope.selArea,
                customer_id: $scope.selCustomer
            };

            $http.post('/addNewConnection/', data)
                .success(function (data) {
                    console.log("added successfully!");
                    alert("Submit success!");
                    // Refresh the page after successful adding
                    document.location.reload();
                })
                .error(function (err) {
                    console.log("An error occured : " + err);
                });
        };
    }
]);