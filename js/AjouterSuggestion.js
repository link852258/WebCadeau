$(document).ready(function () {
    $('#frmAjoutSuggestion').submit(function (e) {
        var url = window.location.pathname;
        var id = url.substring(url.lastIndexOf('/') + 1);
        e.preventDefault();
        $.ajax({
            url: '/ListeSuggestion/' + id,
            type: 'POST',
            data: {
                Cadeau: $('#cadeau').val(),
                Description: $('description').val()
            }
        });
    });
});