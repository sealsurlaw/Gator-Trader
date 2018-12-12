window.onload = function() {	
	var urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has('category')) {
        setTimeout(document.getElementById(urlParams.get('category')).,10);
    }
}