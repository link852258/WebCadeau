$(document).ready(function () {
    $('#PopupSuggestion').on('shown.bs.modal', function (e) {
        var url = window.location.pathname;
        var id = url.substring(url.lastIndexOf('/') + 1);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var b = document.getElementsByClassName('liste')[0];
                b.innerHTML = this.responseText;
            }
        };
        xhttp.open("GET", "/ListeSuggestion", true);
        xhttp.send();
    });
});