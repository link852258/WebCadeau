const express = require('express');
const router = express.Router();


//GET la page Groupe + AjouterSuggestion
router.get('/Groupe/:id', (req, res) => {
    const groupeID = req.params.id;
    const utilisateurID = req.cookies.cookieID;
    conn.obtenirMembreGroupe(groupeID, (listeMembre) => {
        if (listeMembre.length != 0) {
            conn.obtenirInformationGroupe(groupeID, (infoGroupe) => {
                conn.estCreateur(groupeID, req.cookies.cookieID, (estCreateur) => {    //estCreateur determine le createur du groupe
                    conn.obtenirUtilisateurPiger(req.cookies.cookieID, groupeID, (piger) => {
                        conn.obtenirSuggestions(groupeID, utilisateurID, (suggestions) => {
                            res.render('Groupe', { InfoGroupe: infoGroupe, ListeMembre: listeMembre, EstCreateur: estCreateur, Piger: piger, Suggestions: suggestions }); //ListeMembre contient des informations sur les utilisateurs et sur l'échange
                        });
                    });
                });
            })                              //si le nombre de membre est different de zero on ouvre la page Groupe
        }
        else {                              //sinon on retourne à la page Index
            res.redirect('/');
        }
    });
});

//POST on ajoute un membre au groupe
router.post('/Groupe/:id', (req, res) => {
    conn.ajouterMembre(req.params.id, req.body.email, () => {
        res.redirect('/Groupe/' + req.params.id);
    });
});

//DELETE supprime une suggestion dans la liste de nos suggestion.
router.delete('/Delete/Suggestion', (req, res) => {
    const suggestionID = req.body.SuggestionID;
    const groupeID = req.body.GroupeID;
    const utilisateurID = req.cookies.cookieID;
    conn.supprimerMaSuggesion(suggestionID, () => {
        conn.obtenirMesSuggesions(groupeID, utilisateurID, (listeMesSuggestions) => {
            res.render('partiels/ListeSuggestion', { ListeMesSuggestions: listeMesSuggestions });
        });
    });
});

module.exports = router;