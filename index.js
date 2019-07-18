//Ceci est l'entré du programme
const mysql = require('mysql');
const conn = mysql.createConnection({
    host : '69.17.245.17',
    port : '3306',
    user : 'link852258',
    password : 'ganon753',
    database : 'WEBCADEAU'
});

conn.connect((err)=>{
    if(err){
        console.error(err.stack);
        return;
    }
    console.log('connected as id ' + conn.threadId);
    conn.end();
});