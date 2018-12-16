/*
* The purpose of this .js file is for the search header which is
* consistent in all tabs. Depending on the category chosen the
* user can get the items in the same.
*/

window.onload = function() {
	var urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has('category')) {
        setTimeout(document.getElementById(urlParams.get('category')).,10);
    }
}
