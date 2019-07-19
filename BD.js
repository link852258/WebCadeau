module.exports = function BD() {
    //Base de donnée
    const mysql = require('mysql');

    //Connexion à la base de données
    this.ouvrirconnexion = function() {
        const conn = mysql.createConnection({
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

    this.insererUtilisateur = function(username,password,email,nom,prenom){
        conn.query('CALL INSERERUTILISATEUR(?,?,?,?,?)',[{username,password,email,nom,prenom}],(err,results,fields)=>{
            
        });
    }

    //Fermer la connexion
    this.fermerConnexion = function() {
        conn.end();
    }
}