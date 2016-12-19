function validateForm() {
    var x = document.forms["formk"]["description"].value;
    if (x.length > 250 ) {
        alert("Description must not be more than 250 letters");
        return false;
    }else if(x.length < 10) {
        alert("Description is not sufficient");
        return false;
    }
    return true;
}