/*
* The purpose of this .js fie is to redirect users to
* the details page of the item they clicked on.
* This page also has a buttong which can be used to
* contact the seller which pops up a text input box.
*/
window.onload = function() {
	var urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has('open')) {
        setTimeout(document.getElementById('ContactSeller').click(),10);
    }
}
