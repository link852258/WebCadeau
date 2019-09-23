$(document).ready(function () {
    $("#frmPige").submit(function (e) {
        e.preventDefault();
        var url = window.location.pathname;
        var id = url.substring(url.lastIndexOf('/') + 1);
        $.post('/Melanger/' + id, function (data, status) {
            location.reload(true);
        });
    });
});