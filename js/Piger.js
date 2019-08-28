$(document).ready(function () {
    $("#btnPiger").on('click',function(){
        var url = window.location.pathname;
        var id = url.substring(url.lastIndexOf('/')+1);
        $.get('/Melanger/'+id,function(data,status){

        });
    });
});