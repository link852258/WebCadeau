const express = require('express');
const router = express.Router();
const crypto = require('crypto');

//Middleware
var middlewareInscription = function(req,res,next){
    const hash = crypto.createHash('sha256');
    const username = req.body.txtNomUtilisateur;
    const password = req.body.psdMotDePasse;
    const hashPassword = hash.update(password).digest('hex');
    const email = req.body.email;
    const prenom = req.body.txtPrenom;
    const nom = req.body.txtNom;
    conn.insererUtilisateur(username, hashPassword, email, prenom, nom);
    next();
}
//GET la page inscription
router.get('/Inscription', (req, res) => {
    res.render('Inscription');
});

//POST le formulaire d'inscription
router.post('/Inscription',[middlewareInscription], (req, res) => {
    res.redirect('/');
});

module.exports = router;