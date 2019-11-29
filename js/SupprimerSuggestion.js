function supprimerSuggestion(e){
    var suggestionID = e.value;
    $.ajax({
        url: '/Groupe/' + suggestionID,
        type: 'DELETE'
    });
}