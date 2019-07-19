//**********SERVER**********//
const express = require('express');
var BD = require('./BD.js');
const app = express();
const PORT = 3000;
var conn = new BD();
conn.ouvrirconnexion();
//ouvre la connection à la bd


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
    res.render('Inscription');
});

app.listen(PORT);
