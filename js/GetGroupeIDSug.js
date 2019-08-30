$(document).ready(function () {
    $("#btnSuggestion").on('click',function(){
        var url = window.location.pathname;
        var id = url.substring(url.lastIndexOf('/')+1);
        $.get('/ListeSuggestion/'+id,function(data,status){

        });
    });
});