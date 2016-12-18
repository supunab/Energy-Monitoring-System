/**
 * Created by prabod on 12/18/16.
 */
$(document).ready(function () {
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
            }
        });
    });
});