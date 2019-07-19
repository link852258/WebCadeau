//**********SERVER**********//
const express = require('express');
const bodyParser = require('body-parser')
const BD = require('./BD.js');
const app = express();
const PORT = 3000;
var conn = new BD();
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

app.post('/Inscription',(req,res)=>{
    const username = req.body.fNomUtilisateur;
    const password = req.body.fMotDePasse;
    const email = req.body.fEmail;
    const prenom = req.body.fPrenom;
    const nom = req.body.fNom;
    conn.insererUtilisateur(username,password,email,prenom,nom);
    res.render('Inscription');
});

app.listen(PORT);
