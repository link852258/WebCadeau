//**********SERVER**********//
const express = require('express');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const BD = require('./BD.js');
const app = express();
const PORT = 3000;
var conn = new BD();
//ouvre la connection à la bd
conn.ouvrirconnexion();

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.set('views', __dirname + '/vues');

app.set('view engine', 'ejs');

app.get('/',(req,res)=>{
    res.render('Index');
});
app.post('/',(req,res)=>{
    const password = req.body.psdMotDePasse;
    const email = req.body.email;
    var ID = conn.connexionUtilisateur(password,email);
    res.cookie('cookieID' , ID).send('Cookie is set');
    res.render('test');
});

app.get('/test',(req,res)=>{
    res.render('test');
    console.log("Cookies :  ", req.cookies)
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
    const email = req.body.email;
    const prenom = req.body.txtPrenom;
    const nom = req.body.txtNom;
    conn.insererUtilisateur(username,password,email,prenom,nom);
    res.render('Inscription');
});

app.listen(PORT);
