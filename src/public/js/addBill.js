$(document).ready(function () {

    $("#connection_id").select2({
        ajax: {
            url: "/api/get/connection",
            dataType: 'jsonp',
            delay: 250,
            data: function (params) {
                return {
                    connection: params.term
                };
            },
            processResults: function (data, params) {
                // parse the results into the format expected by Select2
                // since we are using custom formatting functions we do not need to
                // alter the remote JSON data, except to indicate that infinite
                // scrolling can be used
                params.page = params.page || 1;
                var temp = [];
                for (var i = 0; i < data.length; i++) {
                    var t = {};
                    t["id"] = data[i].id;
                    t["text"] = data[i].id;
                    temp.push(t);
                }
                return {
                    results: temp,
                };
            },
            cache: true
        },
        escapeMarkup: function (markup) {
            return markup;
        }, // let our custom formatter work
        minimumInputLength: 1,
    });
});