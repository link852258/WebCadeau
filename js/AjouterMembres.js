$(document).ready(function () {
    $('#PopupAjoutMembres').on('shown.bs.modal', function (e) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var b = document.getElementsByClassName('tableau')[0];
                b.innerHTML = this.responseText;
            }
        };
        xhttp.open("GET", "/ObtenirAmis", true);
        xhttp.send();
    });

    $('#txtRecherche').on('input', function (e) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var b = document.getElementsByClassName('tableau')[0];
                b.innerHTML = this.responseText;
            }
        };
        xhttp.open("POST", "/ObtenirAmisParam", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        var texte = $('#txtRecherche').val();
        xhttp.send('txtTexte=' + texte);
    });
});