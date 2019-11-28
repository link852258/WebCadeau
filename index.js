//**********SERVER**********//
const express = require('express');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const PORTHTTP = 1337;
const PORTHTTPS = 443;
const crypto = require('crypto');

const http = require('http');
const https = require('https');
const fs = require('fs');
const helmet = require('helmet');

//Ouvrir la base de données
const BD = require('./BD.js');
global.conn = new BD();
conn.ouvrirConnexion();

const inscription = require('./routes/inscription');
const profil = require('./routes/profil');

//middle-ware
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('css'));
app.use(express.static('js'));
app.use(express.static('img'));

app.use(inscription);
app.use(profil);

app.set('views', __dirname + '/vues');

app.set('view engine', 'ejs');

//page index
app.get('/', (req, res) => {

    if (req.cookies.cookieID == null) { //si le cookie est vide on redirige sur la page connexion sinon actualiter
        res.redirect('Connexion');
    }
    else {
        res.redirect('Actualiter');
    }
});

//fonction de deconnexion, redirige sur la page de connexion
app.get('/Deconnexion', (req, res) => {
    res.clearCookie('cookieID');    //vide le cookie
    res.redirect('Connexion');
});

app.post('/Deconnexion', (req, res) => {
    res.clearCookie('cookieID');    //vide le cookie
    res.redirect('Connexion');
});

//page Actualiter
app.get('/Actualiter', (req, res) => {
    conn.obtenirActualiter(req.cookies.cookieID, (listeActualiter) => { //listeActualiter contient les informations des derniers évènements(ajout de membres, pige)
        res.render('Actualiter', { ListeActualiter: listeActualiter });
    });
});

//ouvre la page de connexion
app.get('/Connexion', (req, res) => {
    if (req.cookies.cookieID == null) { //si le cookie est vide on redirige sur la page connexion sinon actualiter
        res.render('index');
    }
    else {
        res.redirect('Actualiter');
    }
});

//ouvre apres le submit
app.post('/Connexion', (req, res) => {
    const hash = crypto.createHash('sha256');
    const password = req.body.psdMotDePasse;
    const hashPassword = hash.update(password).digest('hex');   //découpage du mot de passe
    const email = req.body.email;
    conn.connexionUtilisateur(email, hashPassword, (ID) => {    //si la connexion est valide alors un cookie est créé et on est redirigé sur actualité
        if (ID !== 0) {
            res.cookie('cookieID', ID).redirect('/Actualiter');
        }
        else {                                                  //sinon on est redirigé sur la page index
            res.redirect('/');
        }
    });
});

//Afficher la page de creation d'echange
app.get('/CreerEchange', (req, res) => {
    res.render('CreerEchange');
});

//Appliquer le post lorsque le groupe sera creer
app.post('/CreerEchange', (req, res) => {
    const id = req.cookies.cookieID;
    const nomGroupe = req.body.txtTitreEchange;
    const theme = req.body.txtTheme;
    const date = req.body.dteEchange;
    const montant = req.body.nbrMontant;
    conn.creerEchange(id, nomGroupe, theme, date, montant, () => {
        res.render('CreerEchange');
    });

});

//ouvrir la page Groupe + AjouterSuggestion
app.get('/Groupe/:id', (req, res) => {
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

//apres le post, on ajoute un membre au groupe
app.post('/Groupe/:id', (req, res) => {
    conn.ajouterMembre(req.params.id, req.body.email, () => {
        res.redirect('/Groupe/' + req.params.id);
    });

});

app.post('/Melanger/:id', (req, res) => {
    conn.obtenirMembreGroupe(req.params.id, (listeMembre) => {  //listeMembre contient les informations des membres du groupe
        if (listeMembre.length > 1) {
            Melanger(listeMembre, (listemel) => {
                conn.pige(req.params.id, listemel, () => {
                    conn.modifierPigeFait(req.params.id,()=>{
                        res.redirect('/Groupe/' + req.params.id);
                    })
                });
            });
        }
        else{
            //todo afficher une erreur
        }
    });
});

app.get('/GroupeAppartient', (req, res) => {
    conn.obtenirGroupesUtilisateur(req.cookies.cookieID, (listeGroupe) => {
        res.render('partiels/GroupeAppartient', { ListeGroupe: listeGroupe });
    });
});

//TODO semble fonctionner
app.post('/ListeMesSuggestion/:id', (req, res) => {
    const groupeID = req.params.id;
    const utilisateurID = req.cookies.cookieID;
    conn.obtenirMesSuggesions(groupeID,utilisateurID,(listeMesSuggestions)=>{
        res.render('partiels/ListeSuggestion',{ListeMesSuggestions: listeMesSuggestions});
    });
    //res.render('partiels/ListeSuggestion');
});

//TODO faire un script pour gerer le post
app.post('/ListeSuggestion/:id', (req, res) => {
    const groupeID = req.params.id;
    const utilisateurID = req.cookies.cookieID;
    const suggestion = req.body.Cadeau;
    const description = req.body.Description;
    conn.ajouterSuggestion(groupeID, utilisateurID, suggestion, description, () => {
        conn.obtenirMesSuggesions(groupeID,utilisateurID,(listeMesSuggestions)=>{
            res.render('partiels/ListeSuggestion',{ListeMesSuggestions: listeMesSuggestions});
        });
        
    });
});

app.get('/SupprimerGroupe', (req, res) => {
    conn.obtenirUtilisateur((liste) => {
        res.render('partiels/TableMembres', { Liste: liste });
    });
});

app.post('/ObtenirAmisParam', (req, res) => {
    const txtTexte = req.body.txtTexte;
    conn.obtenirUtilisateurParam(txtTexte, (liste) => {
        res.render('partiels/TableMembres', { Liste: liste });
    });
});



/*Serveur https*/
https.createServer({
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),
    passphrase: 'allo'
}, app).listen(PORTHTTPS);

/*Serveur http*/
http.createServer(app).listen(PORTHTTP);

function Melanger(listeMembre, callBack) {  //fonction pour melanger les membres du groupe pour la pige
    var liste = [];
    var listeAMelanger = [];

    for (var i = 0; i < listeMembre.length; i++) {
        liste.push(listeMembre[i].EMAIL);
    }

    for (var i = 0; i < liste.length; i++) {
        listeAMelanger[i] = [];
    }

    for (var i = 0; i < liste.length; i++) {
        listeAMelanger[i][0] = liste[i];
        listeAMelanger[i][1] = "";
    }


    for (var i = 0; i < listeAMelanger.length; ++i) {
        if (listeAMelanger[i][0] == liste[i]) {
            i = -1;
            shuffle();
        }
        else {
            listeAMelanger[i][1] = liste[i];
        }
    }
    function shuffle() {
        for (var i = 0; i < liste.length; i++) {
            var rdm = Math.floor(Math.random() * liste.length);
            var rdm2 = Math.floor(Math.random() * liste.length);
            var temp = liste[rdm];
            liste[rdm] = liste[rdm2];
            liste[rdm2] = temp;
        }
    }
    callBack(listeAMelanger);
}