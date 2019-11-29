const express = require('express');
const router = express.Router();

var middlewareCreerEchange = function (req, res, next) {
    const id = req.cookies.cookieID;
    const nomGroupe = req.body.txtTitreEchange;
    const theme = req.body.txtTheme;
    const date = req.body.dteEchange;
    const montant = req.body.nbrMontant;
    conn.creerEchange(id, nomGroupe, theme, date, montant);
    next();
}

//Afficher la page de creation d'echange
router.get('/CreerEchange', (req, res) => {
    res.render('CreerEchange');
});

//Appliquer le post lorsque le groupe sera creer
router.post('/CreerEchange', [middlewareCreerEchange], (req, res) => {
    res.render('CreerEchange');
});

module.exports = router;