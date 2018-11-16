function passwordValidation(){
    var Pswd  = document.getElementById("UserPswd");
    var rPswd = document.getElementById("RePswd");
    if( Pswd.value != rPswd.value){
            alert("Passwords Don't Match");
            return false;
    }
    return true;
}
// Removes spaces from username
function removeSpaces(string) {
    return string.split(' ').join('');
}