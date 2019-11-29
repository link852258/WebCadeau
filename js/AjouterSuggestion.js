$(document).ready(function () {
    $('#frmAjoutSuggestion').submit(function (e) {
        e.preventDefault();
        var url = window.location.pathname;
        var id = url.substring(url.lastIndexOf('/') + 1);
        $.ajax({
            url: '/ListeSuggestion/' + id,
            type: 'POST',
            data: {
                Cadeau: $('#cadeau').val(),
                Description: $('#description').val()
            }
        })
        .done(function(data){
            $('#cadeau').val('');
            $('#description').val('');
            $('.liste').empty();
            $('.liste').append(data);
        });
    });
});