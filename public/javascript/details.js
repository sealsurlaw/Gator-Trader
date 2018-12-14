window.onload = function() {	
	var urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has('open')) {
        setTimeout(document.getElementById('ContactSeller').click(),10);
    }
}