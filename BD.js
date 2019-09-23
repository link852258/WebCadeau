module.exports = function BD() {
    //Base de donnée
    const mysql = require('mysql');

    var pool = mysql.createPool({
        host: '69.17.245.17',
        port: '3306',
        user: 'WEBCADEAU',
        password: 'Webcadeau!',
        database: 'WEBCADEAU'
    });

    //Ajouter un nouvel utilisateur dans la base de donnee
    this.insererUtilisateur = function (username, password, email, prenom, nom) {
        pool.query('CALL INSERERUTILISATEUR(?,?,?,?,?)', [username, password, email, prenom, nom], (err, results, fields) => {
            if (err) throw err;
        });
    }

    //Trouve s'il y a un utilisateur qui correspond aux information transmise
    this.connexionUtilisateur = function (email, password, callBack) {
        pool.query('SELECT CONNEXIONUTILISATEUR(?,?) as ID', [email, password], (err, results, fields) => {
            if (err) throw err;
            var id = 0;
            if (results[0].ID != null) {
                id = results[0].ID;
            }
            callBack(id);
        });
    }

    //Modification de l'utilisateur
    this.modifierUtilisateur = function (id, password, prenom, nom) {
        pool.query('CALL MODIFIERUTILISATEUR(?,?,?,?)', [id, password, prenom, nom], (err, results, fields) => {
            if (err) throw err;
        });
    }

    //Creation d'un echange
    this.creerEchange = function (idCreateur, nomGroupe, theme, date, montant, callBack) {
        //creer un echange
        pool.query('CALL CREERGROUPE(?,?,?,?,?)', [idCreateur, nomGroupe, theme, date, montant], (err, results, fields) => {
            if (err) throw err;
            callBack();
        });
    }

    //Creation d'un echange
    /*this.creerEchange = function (idCreateur, nomGroupe, theme, date, montant) {
        this.ouvrirconnexion();
        //creer un echange
        conn.query('CALL CREERGROUPE(?,?,?,?,?)', [idCreateur, nomGroupe, theme, date, montant], (err, results, fields) => {
            //va chercher le id de l'echange
            conn.query('select DERNIERGROUPECREER(?) as idGroupe', [idCreateur], (err, results, fields) => {
                //ajouter les participant à l'échange
                var idGroupe = results[0].idGroupe;
                conn.query('call AjouterMembre(?,?)', [idGroupe, idCreateur], (err, results, fields) => {
                    for (var i = 0; i < 10; i++) {
                        //TODO 
                    }

                });
            });
        });
    }*/

    this.obtenirUtilisateur = function (callBack) {
        pool.query('CALL OBTENIRTOUSUTILISATEURS()', (err, results, fields) => {
            if (err) throw err;
            callBack(results[0]);
        });
    }

    this.obtenirUtilisateurParam = function (texte, callBack) {
        pool.query('CALL OBTENIRTOUSUTILISATEURSPARAM(?)', [texte], (err, results, fields) => {
            if (err) throw err;
            callBack(results[0]);
        });
    }

    this.obtenirActualiter = function (utilisateurID, callBack) {
        pool.query('CALL AFFICHER_ACTUALITER(?)', [utilisateurID], (err, results, fields) => {
            if (err) throw err;
            callBack(results[0]);
        });
    }

    this.obtenirGroupesUtilisateur = function (utilisateurID, callBack) {
        pool.query('CALL AFFICHER_GROUPE_APPARTIENT(?)', [utilisateurID], (err, results, fields) => {
            if (err) throw err;
            callBack(results[0]);
        });
    }

    this.obtenirMembreGroupe = function (groupeID, callBack) {
        pool.query('CALL LISTEMEMBREGROUPE(?)', [groupeID], (err, results, fields) => {
            if (err) throw err;
            callBack(results[0]);
        });
    }

    this.ajouterMembre = function (groupeID, email, callBack) {
        pool.query('CALL AJOUTERMEMBRE(?,?)', [groupeID, email], (err, results, fields) => {
            if (err) throw err;
            callBack();
        });
    }

    this.pige = function (groupeID, email, callBack) {
        for (var i = 0; i < email.length; i++) {
            pool.query('CALL PIGER_UTILISATEUR_APPARTIENT(?,?,?)', [groupeID, email[i][0], email[i][1]], (err, results, fields) => {
                if (err) throw err;
            });
        }
        callBack();
    }

    this.ajouterSuggestion = function (groupeID, utilisateurID, suggestion, description, callBack) {
        pool.query('CALL INSERERSUGGESTION(?,?,?,?)', [groupeID, utilisateurID, suggestion, description], (err, results, fields) => {
            if (err) throw err;
            callBack();
        });
    }

    this.estCreateur = function (groupeID, creatorID, callBack) {
        pool.query('CALL EST_CREATEUR(?,?)', [groupeID, creatorID], (err, results, fields) => {
            if (err) throw err;
            callBack(results[0]);
        });
    }

    this.obtenirUtilisateurPiger = function (utilisateurID, groupeID, callBack) {
        pool.query('CALL OBTENIR_UTILISATEUR_PIGER(?,?)', [utilisateurID, groupeID], (err, results, fields) => {
            if (err) throw err;
            callBack(results[0]);
        });
    }

    this.obtenirInformationGroupe = function (groupeID, callBack) {
        pool.query('CALL OBTENIR_INFORMATION_GROUPE(?)', [groupeID], (err, results, fields) => {
            if (err) throw err;
            callBack(results[0]);
        });
    }

    this.modifierPigeFait = function (groupeID, callBack) {
        pool.query('CALL MODIFIER_PIGE_FAIT(?)', [groupeID], (err, results, fields) => {
            if (err) throw err;
            callBack(results[0]);
        });
    }

    this.obtenirPersonnePiger = function(groupeID,utilisateurID,callBack){
        pool.query('CALL OBTENIRPERSONNEPIGER(?,?)', [groupeID,utilisateurID],(err,resuts,fields)=>{
            if(err) throw err;
            callBack(results[0]);
        });
    }
    
    this.obtenirSuggestions = function(groupeID,utilisateurID,callBack){
        pool.query('CALL OBTENIR_SUGGESTIONS(?,?)', [groupeID,utilisateurID],(err,results,fields)=>{
            if(err) throw err;
            callBack(results[0]);
        });
    }
}