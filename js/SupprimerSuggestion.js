function supprimerSuggestion(e){
    var suggestionID = e.value;
    var url = window.location.pathname;
    var groupeID = url.substring(url.lastIndexOf('/') + 1);
    $.ajax({
        url: '/Delete/Suggestion',
        type: 'DELETE',
        data:{
            SuggestionID: suggestionID,
            GroupeID: groupeID
        }
    })
    .done(function(data){
        $('.liste').empty();
        $('.liste').append(data);
    });
}