//Ceci est l'entré du programme
/*const mysql = require('mysql');
const conn = mysql.createConnection({
    host : '69.17.245.17',
    port : '3306',
    user : 'WEBCADEAU',
    password : 'Webcadeau!',
    database : 'WEBCADEAU'
});

conn.connect((err)=>{
    if(err){
        console.error(err.stack);
        return;
    }
    console.log('connected as id ' + conn.threadId);
    conn.end();
});*/

//**********SERVER**********//
const express = require('express');
const app = express();
const PORT = 3000;

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
