module.exports = function BD() {
    //Base de donnée
    const mysql = require('mysql');
    var conn = "";
    //Connexion à la base de données
    this.ouvrirconnexion = function() {
            conn = mysql.createConnection({
            host: '69.17.245.17',
            port: '3306',
            user: 'WEBCADEAU',
            password: 'Webcadeau!',
            database: 'WEBCADEAU'
        });

        //Retourne une erreur si la connexion à échoué
        conn.connect((err) => {
            if (err) {
                console.error(err.stack);
                return;
            }
            console.log('connected as id ' + conn.threadId);
        });
    }

    this.insererUtilisateur = function(username,password,email,prenom,nom){
        conn.query('CALL INSERERUTILISATEUR(?,?,?,?,?)',[username,password,email,prenom,nom],(err,results,fields)=>{
            conn.end();
        });
    }

    this.connexionUtilisateur = function(password,email){
        conn.query('SELECT CONNEXIONUTILISATEUR(?,?)',[password,email],(err,results,fields)=>{
            conn.end();
            return results[0];
        });
    }

    this.modifierUtilisateur = function(id,password,prenom,nom){
        conn.query('CALL MODIFIERUTILISATEUR(?,?,?,?)',[id,password,prenom,nom],(err,results,fields)=>{
            conn.end();
        });
    }

    //Fermer la connexion
    this.fermerConnexion = function() {
        conn.end();
    }
}