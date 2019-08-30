$(document).ready(function () {
    $('#frmAjoutSuggestion').submit(function (e) {
        e.preventDefault();
        var cadeau = document.getElementById('cadeau').value;
        var description = document.getElementById('description').value;
        var url = window.location.pathname;
        var id = url.substring(url.lastIndexOf('/')+1);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var b = document.getElementsByClassName('tableau')[0];
                b.innerHTML = this.responseText;
            }
        };
        xhttp.open("post", "/ListeSuggestion/"+id, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("cadeau="+cadeau+"&description="+description);
    });
});