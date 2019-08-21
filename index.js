//**********SERVER**********//
const express = require('express');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const BD = require('./BD.js');
const app = express();
const PORT = 3000;
var conn = new BD();
const crypto = require('crypto');

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static('css'));
app.use(express.static('js'));

app.set('views', __dirname + '/vues');

app.set('view engine', 'ejs');

app.get('/',(req,res)=>{
    res.redirect('Connexion');
});
app.post('/',(req,res)=>{
    res.redirect('Connexion');
});

app.get('/Actualiter',(req,res)=>{
    res.render('Actualiter');
    console.log("Cookies :  ", req.cookies.cookieID);
});

app.get('/Connexion',(req,res)=>{
    res.render('index');
});
app.post('/Connexion',(req,res)=>{
    const hash = crypto.createHash('sha256');
    const password = req.body.psdMotDePasse;
    const hashPassword = hash.update(password).digest('hex');
    const email = req.body.email;
    conn.connexionUtilisateur(email,hashPassword,(ID)=>{
        if(ID !== 0){
            console.log(ID);
            console.log("ca marche")
            res.cookie('cookieID' , ID).redirect('/Actualiter');
        }
        else{
            res.redirect('/index');
        }
    });
});

app.get('/Inscription',(req,res)=>{
    res.render('Inscription');
});

//
app.post('/Inscription',(req,res)=>{
    const hash = crypto.createHash('sha256');
    const username = req.body.txtNomUtilisateur;
    const password = req.body.psdMotDePasse;
    const hashPassword = hash.update(password).digest('hex');
    const email = req.body.email;
    const prenom = req.body.txtPrenom;
    const nom = req.body.txtNom;
    conn.insererUtilisateur(username,hashPassword,email,prenom,nom);
    res.redirect('/');
});

app.get('/modification',(req,res)=>{
    res.render('Modification')
});
//TODO tester quand le cookie sera pret
app.post('/modification',(req,res)=>{
    const hash = crypto.createHash('sha256');
    const id = req.cookies.cookieID;
    const password = req.body.psdMotDePasse;
    const hashPassword = hash.update(password).digest('hex');
    const prenom = req.body.txtPrenom;
    const nom = req.body.txtNom;
    conn.modifierUtilisateur(id,hashPassword,prenom,nom);
    res.render('Modification')
});

//Afficher la page de creation d'echange
app.get('/CreerEchange',(req,res)=>{
    res.render('CreerEchange');
});

//Appliquer le post lorsque le groupe sera creer
app.post('/CreerEchange',(req,res)=>{
    const id = req.cookies.cookieID;
    const nomGroupe = req.body.txtTitreEchange;
    const theme = req.body.txtTheme;
    const date = req.body.dteEchange;
    const montant = req.body.nbrMontant;
    conn.creerEchange(id,nomGroupe,theme,date,montant,()=>{
        res.render('CreerEchange');
    });
    
});

app.get('/ObtenirAmis',(req,res)=>{
    conn.obtenirUtilisateur((liste)=>{
        res.render('partiels/TableMembres',{Liste: liste});
    });
});

app.get('/SupprimerGroupe',(req,res)=>{
    conn.obtenirUtilisateur((liste)=>{
        res.render('partiels/TableMembres',{Liste: liste});
    });
});

app.post('/ObtenirAmisParam',(req,res)=>{
    const txtTexte = req.body.txtTexte;
    conn.obtenirUtilisateurParam(txtTexte, (liste)=>{
        res.render('partiels/TableMembres',{Liste: liste});
    });
});

app.listen(PORT);
