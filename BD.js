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
        this.ouvrirconnexion();
        conn.query('CALL INSERERUTILISATEUR(?,?,?,?,?)',[username,password,email,prenom,nom],(err,results,fields)=>{
            conn.end();
        });
    }

    this.connexionUtilisateur = function(email,password,callBack){
        this.ouvrirconnexion();
        conn.query('SELECT CONNEXIONUTILISATEUR(?,?) as ID',[email,password],(err,results,fields)=>{
            conn.end();
            var id =0;
            if(results[0].ID != null){
                id = results[0].ID;
            }
            callBack(id);
        });
    }

    this.modifierUtilisateur = function(id,password,prenom,nom){
        this.ouvrirconnexion();
        conn.query('CALL MODIFIERUTILISATEUR(?,?,?,?)',[id,password,prenom,nom],(err,results,fields)=>{
            conn.end();
        });
    }

    this.creerEchange() = function(idCreateur,nomGroupe,theme,date,montant){
        this.ouvrirconnexion();
        //creer un echange
        conn.query('CALL CREERGROUPE(?,?,?,?,?)',[idCreateur,nomGroupe,theme,date,montant],(err,results,fields)=>{
            // va chercher le id de l'echange
            conn.query('select DERNIERGROUPECREER(?) as idGroupe',[idCreateur],(err,results,fields)=>{
            //ajouter les participant à l'échange
            var idGroupe = results[0].idGroupe;
            conn.query('call AjouterMembre(?,?)',[idGroupe,idCreateur],(err,results,fields)=>{
                for(var i=0;i<10; i++){
                    //TODO 
                }
                
                });
            });
        });
    };

    //Fermer la connexion
    this.fermerConnexion = function() {
        conn.end();
    }
}