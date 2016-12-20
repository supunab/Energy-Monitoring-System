/**
 * Created by prabod on 12/18/16.
 */
$(document).ready(function () {
    $.ajax({
        type: 'GET',
        url: "/api/get/areas",
        dataType: 'jsonp',
        async: false,
        success: function (result) {
            var temp = [];
            for (var i = 0; i < result.length; i++) {
                var t = {};
                t["id"] = result[i].name;
                t["text"] = result[i].name;
                temp.push(t);
            }
            areas = temp;
            console.log(result);
            $("#area").select2({
                data: temp,
                maximumSelectionLength: connections.length - 1
            });
        }
    });

    salesChart = new Chart(salesChartCanvas, {
        type: 'line',
        data: salesChartData,
        options: salesChartOptions
    });
    barChart = new Chart(barChartCanvas, {
        type: 'bar',
        data: barChartData,
        options: barChartOptions
    });
    let area = $("#area").select2('data');
    let selectedArea = [];
    let connectionType = $("#connectionType").select2('data');
    let selectedconnectionType = [];

    for (let i = 0; i < area.length; i++) {
        selectedArea.push(area[i]['text'])
    }

    for (let i = 0; i < connectionType.length; i++) {
        selectedconnectionType.push(connectionType[i]['text'])
    }
    data = {
        dateRange: $('#reservation').val(),
        area: selectedArea,
        connectionType: selectedconnectionType
    };
    console.log(data);
    $.ajax({
        type: 'GET',
        url: "/api/get/consumption",
        data: data,
        dataType: 'jsonp',
        async: true,
        success: function (result) {
            console.log(result)
            salesChartData.labels = result.labels;
            salesChartData.datasets[0].data = result.data;
            salesChart.reset();
            salesChart.update();
            barChartData["labels"] = result.labels;
            barChartData.datasets[0]["data"] = result.expected;
            barChartData.datasets[1]["data"] = result.income;
            barChart.reset();
            barChart.update();
            let total_energy = result.data.reduce(add, 0);
            let total_income = result.income.reduce(add, 0);
            let total_expected_income = result.expected.reduce(add, 0);
            $("#total_energy").text(total_energy + " kWh");
            $("#total_expected_income").text("Rs " + total_expected_income);
            $("#total_income").text("Rs " + total_income);
            $("#energy_header").text("Energy Consumption : " + $('#reservation').val());
            $("#income_header").text("Income Comparison : " + $('#reservation').val());
            $("#powercuts").text(result.powercuts);
            $("#connectionReq").text(result.connectionReq);
            $("#complaints").text(result.complaint);
            $("#breakdown").text(result.breakdown);
        }
    });

    $("#submit").click(function () {
        let area = $("#area").select2('data');
        let selectedArea = [];
        let connectionType = $("#connectionType").select2('data');
        let selectedconnectionType = [];

        for (let i = 0; i < area.length; i++) {
            selectedArea.push(area[i]['text'])
        }

        for (let i = 0; i < connectionType.length; i++) {
            selectedconnectionType.push(connectionType[i]['text'])
        }
        data = {
            dateRange: $('#reservation').val(),
            area: selectedArea,
            connectionType: selectedconnectionType
        };
        console.log(data);
        $.ajax({
            type: 'GET',
            url: "/api/get/consumption",
            data: data,
            dataType: 'jsonp',
            async: true,
            success: function (result) {
                console.log(result)
                salesChartData.labels = result.labels;
                salesChartData.datasets[0].data = result.data;
                salesChart.reset();
                salesChart.update();
                barChartData["labels"] = result.labels;
                barChartData.datasets[0]["data"] = result.expected;
                barChartData.datasets[1]["data"] = result.income;
                barChart.reset();
                barChart.update();
                let total_energy = result.data.reduce(add, 0);
                let total_income = result.income.reduce(add, 0);
                let total_expected_income = result.expected.reduce(add, 0);
                $("#total_energy").text(total_energy + " kWh");
                $("#total_expected_income").text("Rs " + total_expected_income);
                $("#total_income").text("Rs " + total_income);
                $("#energy_header").text("Energy Consumption : " + $('#reservation').val());
                $("#income_header").text("Income Comparison : " + $('#reservation').val());
                $("#powercuts").text(result.powercuts);
                $("#connectionReq").text(result.connectionReq);
                $("#complaints").text(result.complaint);
                $("#breakdown").text(result.breakdown);
            }
        });
    });

    function add(a, b) {
        return a + b;
    }
});