//**********SERVER**********//
const express = require('express');
const bodyParser = require('body-parser');
const BD = require('./BD.js');
const app = express();
const PORT = 3000;
var conn = new BD();

const crypto = require('crypto');
const hash = crypto.createHash('sha256');
//ouvre la connection à la bd
conn.ouvrirconnexion();

app.use(bodyParser.urlencoded({extended: true}));

app.set('views', __dirname + '/vues');

app.set('view engine', 'ejs');

app.get('/',(req,res)=>{
    res.render('Index');
});
app.post('/',(req,res)=>{
    res.render('Index');
});

app.get('/Connexion',(req,res)=>{
    res.render('Index');
});
app.post('/Connexion',(req,res)=>{
    res.render('Index');
});

app.get('/Inscription',(req,res)=>{
    res.render('Inscription');
});

//
app.post('/Inscription',(req,res)=>{
    const username = req.body.txtNomUtilisateur;
    const password = req.body.psdMotDePasse;
    const hashPassword = hash.update(password).digest('hex');
    const email = req.body.email;
    const prenom = req.body.txtPrenom;
    const nom = req.body.txtNom;
    //conn.insererUtilisateur(username,hashPassword,email,prenom,nom);
    res.redirect('/');
});

app.get('/modification',(req,res)=>{
    res.render('Modification')
});
//TODO tester quand le cookie sera pret
app.post('/modification',(req,res)=>{
    const password = req.body.psdMotDePasse;
    const hashPassword = hash.update(password).digest('hex');
    const prenom = req.body.txtPrenom;
    const nom = req.body.txtNom;
    conn.modifierUtilisateur(id,hashPassword,prenom,nom);
    res.render('Modification')
});

app.listen(PORT);
