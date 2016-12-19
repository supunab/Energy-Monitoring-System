exports.getIndex = function (req, res) {
    res.render('index');
}

exports.errorPage404 = function (req, res) {
    res.render('pageNotAvailable');
}

exports.errorPage401 = function (req, res) {
    res.render('unAuthenticatePage');
}