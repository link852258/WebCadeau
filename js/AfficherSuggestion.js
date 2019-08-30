$(document).ready(function () {
    $('#PopupSuggestion').on('shown.bs.modal', function (e) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var b = document.getElementsByClassName('liste')[0];
                b.innerHTML = this.responseText;
                $('.table-row').click(function () {
                    window.document.location = $(this).data('href');
                });
            }
        };
        xhttp.open("GET", "/ListeSuggestion", true);
        xhttp.send();
    });
});