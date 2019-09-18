//**********SERVER**********//
const express = require('express');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const BD = require('./BD.js');
const app = express();
const PORTHTTP = 80;
const PORTHTTPS = 443;
var conn = new BD();
const crypto = require('crypto');

const http = require('http');
const https = require('https');
const fs = require('fs');
const helmet = require('helmet');


//middle-ware
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('css'));
app.use(express.static('js'));
app.use(express.static('img'));

app.set('views', __dirname + '/vues');

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    if (req.cookies.cookieID == null) {
        res.redirect('Connexion');
    }
    else {
        res.redirect('Actualiter');
    }
});

app.post('/', (req, res) => {
    res.redirect('Connexion');
});

app.get('/Deconnexion', (req, res) => {
    res.clearCookie('cookieID');
    res.redirect('Connexion');
});

app.post('/Deconnexion', (req, res) => {
    res.clearCookie('cookieID');
    res.redirect('Connexion');
});

app.get('/Actualiter', (req, res) => {
    conn.obtenirActualiter(req.cookies.cookieID, (listeActualiter) => {
        res.render('Actualiter', { ListeActualiter: listeActualiter });
    });

    //console.log("Cookies :  ", req.cookies.cookieID);
});

app.get('/Connexion', (req, res) => {
    res.render('index');
});

app.post('/Connexion', (req, res) => {
    const hash = crypto.createHash('sha256');
    const password = req.body.psdMotDePasse;
    const hashPassword = hash.update(password).digest('hex');
    const email = req.body.email;
    conn.connexionUtilisateur(email, hashPassword, (ID) => {
        if (ID !== 0) {
            res.cookie('cookieID', ID).redirect('/Actualiter');
        }
        else {
            res.redirect('/');
        }
    });
});

app.get('/Inscription', (req, res) => {
    res.render('Inscription');
});

//
app.post('/Inscription', (req, res) => {
    const hash = crypto.createHash('sha256');
    const username = req.body.txtNomUtilisateur;
    const password = req.body.psdMotDePasse;
    const hashPassword = hash.update(password).digest('hex');
    const email = req.body.email;
    const prenom = req.body.txtPrenom;
    const nom = req.body.txtNom;
    conn.insererUtilisateur(username, hashPassword, email, prenom, nom);
    res.redirect('/');
});

app.get('/profil', (req, res) => {
    res.render('Modification')
});

app.post('/profil', (req, res) => {
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
    res.render('Modification')
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

app.get('/Groupe/:id', (req, res) => {
    conn.obtenirMembreGroupe(req.params.id, (listeMembre) => {
        if (listeMembre.length != 0) {
            conn.estCreateur(req.params.id, req.cookies.cookieID, (estCreateur) => {
                res.render('Groupe', { ListeMembre: listeMembre, EstCreateur: estCreateur });
            });
        }
        else{
            res.redirect('/');
        }
    });
});

app.post('/Groupe/:id', (req, res) => {
    conn.ajouterMembre(req.params.id, req.body.email, () => {
        res.redirect('/Groupe/' + req.params.id);
    });

});

app.get('/Melanger/:id', (req, res) => {
    conn.obtenirMembreGroupe(req.params.id, (listeMembre) => {
        Melanger(listeMembre, (listemel) => {
            for (var i = 0; i < listemel.length; i++) {
                conn.pige(req.params.id, listemel[i][0], listemel[i][1], () => {

                });
            }
        });
        res.render('Groupe', { ListeMembre: listeMembre });
    });

    function Melanger(listeMembre, callBack) {
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
});

app.get('/ObtenirAmis', (req, res) => {
    conn.obtenirUtilisateur((liste) => {
        res.render('partiels/TableMembres', { Liste: liste });
    });
});

app.get('/GroupeAppartient', (req, res) => {
    conn.obtenirGroupesUtilisateur(req.cookies.cookieID, (listeGroupe) => {
        res.render('partiels/GroupeAppartient', { ListeGroupe: listeGroupe });
    });
});

//TODO semble fonctionner
app.get('/ListeSuggestion', (req, res) => {
    res.render('partiels/ListeSuggestion');
});

//TODO faire un script pour gerer le post
app.post('/ListeSuggestion/:id', (req, res) => {
    const groupeID = req.params.id;
    const utilisateurID = req.cookies.cookieID;
    const suggestion = req.body.Cadeau;
    const description = req.body.Description;
    conn.ajouterSuggestion(groupeID, utilisateurID, suggestion, description, () => {
        res.render('partiels/ListeSuggestion');
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