const express = require('express');
const router = express.Router();


//GET la page Groupe + AjouterSuggestion
router.get('/Groupe/:id', (req, res) => {
    var groupeID = req.params.id;
    const utilisateurID = req.cookies.cookieID;
    conn.obtenirMembreGroupe(groupeID, (listeMembre) => {
        if (listeMembre.length != 0) {  
            conn.obtenirInformationGroupe(groupeID,(infoGroupe)=>{
                conn.estCreateur(groupeID, req.cookies.cookieID, (estCreateur) => {    //estCreateur determine le createur du groupe
                    conn.obtenirUtilisateurPiger(req.cookies.cookieID, groupeID, (piger) => {
                        conn.obtenirSuggestions(groupeID, utilisateurID, (suggestions)=>{
                            res.render('Groupe', {InfoGroupe:infoGroupe, ListeMembre: listeMembre, EstCreateur: estCreateur, Piger: piger, Suggestions: suggestions}); //ListeMembre contient des informations sur les utilisateurs et sur l'échange
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

router.delete('/Groupe/:id',(req, res)=>{
    conn.supprimerMaSuggesion(req.params.id,()=>{
        res.redirect();
    });
});

module.exports = router;