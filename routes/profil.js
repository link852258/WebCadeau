const express = require('express');
const router = express.Router();
const crypto = require('crypto');

//Middleware
var middlewareProfil = function(req,res,next){
    const hash = crypto.createHash('sha256');
    const id = req.cookies.cookieID;
    const password = req.body.psdMotDePasse;
    var hashPassword = hash.update(password).digest('hex');
    if (password === "") {
        hashPassword = "";
    }
    const prenom = req.body.txtPrenom;
    const nom = req.body.txtNom;
    conn.modifierUtilisateur(id, hashPassword, prenom, nom);
    next();
}

//page de modification du profil
router.get('/Profil', (req, res) => {
    res.render('Modification')
});

//apres le submit, application des modification
router.post('/Profil', [middlewareProfil], (req, res) => {
    res.render('Modification')
});

module.exports = router;