function viewSwitch(view,elmnt,color) {
				var i, tabcontent, tablinks;
				tabcontent = document.getElementsByClassName("tab-content");
				for (i = 0; i < tabcontent.length; i++) {
					tabcontent[i].style.display = "none";
				}
				tablinks = document.getElementsByClassName("tab-link");
				for (i = 0; i < tablinks.length; i++) {
					tablinks[i].style.backgroundColor = "";
				}
				document.getElementById(view).style.display = "block";
				elmnt.style.backgroundColor = color;

			}

$("document").ready(function() {	
	var urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has('remove_user') || urlParams.has('sort_user')) {
        setTimeout(document.getElementById('userButton').click(),10);
	}
	else {
		setTimeout(document.getElementById('defaultOpen').click(),10);
	}
});