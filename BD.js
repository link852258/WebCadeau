module.exports = function BD() {
    //Base de donnée
    const mysql = require('mysql');
    var pool;
    this.ouvrirConnexion = function () {
        pool = mysql.createPool({
            host: '69.17.245.10',
            port: '3306',
            user: 'WEBCADEAU',
            password: 'Webcadeau!',
            database: 'WEBCADEAU'
        });
    }

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
    this.creerEchange = function (idCreateur, nomGroupe, theme, date, montant) {
        //creer un echange
        pool.query('CALL CREERGROUPE(?,?,?,?,?)', [idCreateur, nomGroupe, theme, date, montant], (err, results, fields) => {
            if (err) throw err;
        });
    }

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

    this.obtenirPersonnePiger = function (groupeID, utilisateurID, callBack) {
        pool.query('CALL OBTENIRPERSONNEPIGER(?,?)', [groupeID, utilisateurID], (err, resuts, fields) => {
            if (err) throw err;
            callBack(results[0]);
        });
    }

    this.obtenirSuggestions = function (groupeID, utilisateurID, callBack) {
        pool.query('CALL OBTENIR_SUGGESTIONS(?,?)', [groupeID, utilisateurID], (err, results, fields) => {
            if (err) throw err;
            callBack(results[0]);
        });
    }

    this.obtenirMesSuggesions = function (groupeID, utilisateurID, callBack) {
        pool.query('CALL OBTENIR_MES_SUGGESTIONS(?,?)', [groupeID, utilisateurID], (err, results, fields) => {
            if (err) throw err;
            callBack(results[0]);
        });
    }
    
    //Supprimer une de nos suggestion
    this.supprimerMaSuggesion = function (suggestionID, callBack) {
        pool.query('CALL SUPPRIMER_MA_SUGGESTION(?)', [suggestionID], (err, results, fields) => {
            if (err) throw err;
            callBack(results[0]);
        });
    }
}