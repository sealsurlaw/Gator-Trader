/*
* This is where we check if the password is valid and and where
* we remove any spaces from the entered username.
*/
function passwordValidation(){
    var Pswd  = document.getElementById("UserPswd");
    var rPswd = document.getElementById("RePswd");
    if( Pswd.value != rPswd.value){
            alert("Passwords Don't Match");
            return false;
    }
    return true;
}
/*
* This function removes spaces from username
*/
function removeSpaces(string) {
    return string.split(' ').join('');
}
