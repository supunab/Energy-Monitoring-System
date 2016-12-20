function validateForm() {
    var x = document.forms["payment"]["amount"].value;
    var amount= parseInt(x);
    if(amount<100){
        alert("You have to pay more than Rs:100");
        return false;
    }
    return true;
}