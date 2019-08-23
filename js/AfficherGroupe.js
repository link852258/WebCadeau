$(document).ready(function () {
    $('#PopupEchange').on('shown.bs.modal', function (e) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var b = document.getElementsByClassName('modal-body')[0];
                b.innerHTML = this.responseText;
            }
        };
        xhttp.open("GET", "/GroupeAppartient", true);
        xhttp.send();
    });
});