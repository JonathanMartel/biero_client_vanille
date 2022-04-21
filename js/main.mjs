/**
 * Fichier principal, il contient la logique de l'application.
 * @todo Ajouter l'affichage de la page d'accueil (les 5 meilleures bières, avec les informations de base [nom, brasserie, moyenne, nombre de note])
 * @todo Compléter la page /liste. Faire fonctionner les tris (nom, brasserie et note [ASC et DESC]) en utilisant le module Biere
 * @todo Ajouter une page Détail. Une route supplémentaire /liste/:id_biere qui affiche les détails d'une bière ([nom, brasserie, moyenne, nombre de note, description]) ainsi que les commentaires reçus 
 * @todo (Bonus mais juste pour des points virtuels) Utiliser les partials (mustache) pour gérer les affichages (accueil et liste)
 * @todo (Bonus mais juste pour des points virtuels) Remplacer mustache.js par handlebar.js
 * @todo (Bonus mais juste pour des points virtuels) Utiliser page.js pour faire les tris (Donc l'url)
 */
 
import Biere from './Biere.mjs';
import Affichage from './Affichage.mjs';
import page from "//unpkg.com/page/page.mjs";

// IIFE (Immediatly invoqued function expression)
(function(){
    const _app = document.querySelector(".app");
    
    // La définition des routes et des callback sur l'appel des routes.
    const _route = [
        {
            route : "/", 
            cb : cbAccueil
        },
        {
            route : "/liste", 
            cb : [cbLog, cbListe]
        },
        {
            route : "/contact", 
            cb : cbContact
        },
    ]
    // Génère la configuration du routeur en traitant l'ensemble des routes du tableau _route.
    _route.forEach((route)=>{
        if(Array.isArray(route.cb)){
            page(route.route, ...route.cb);        
        }
        else{
            page(route.route, route.cb);
        }
        
        
    })
   
    /*page("/", cbAccueil)
    page("/liste", cbListe)
    page("/contact", cbContact)*/

     // Toujours s'assurer que le DOM est prêt avant de manipuler le HTML.
    document.addEventListener("DOMContentLoaded", ()=>{
        // Affichage de la navigation
        Affichage.chargementTemplate("nav", document.querySelector(".nav"), {});
        
        // Démarrage du routeur
        page({
            hashbang:true
        });   
        
        _app.addEventListener("click", (evt)=>{
            console.log(evt);
            if(evt.target.classList.contains("btnNomASC")){
                Biere.getListeBiereTrier({champ:"nom", ordre:"ASC"}).then((listeBiere)=>{
                    Affichage.chargementTemplate("liste", _app, listeBiere);
                });
            
            }else if(evt.target.classList.contains("btnNomDESC")){
                Biere.getListeBiereTrier({champ:"nom", ordre:"DESC"}).then((listeBiere)=>{
                    Affichage.chargementTemplate("liste", _app, listeBiere);
                });
            }
        })
        
       
       
        
        

    })

    /**
     *  Controlleur de la page d'accueil
     */
    function cbAccueil(){
        console.log("accueil");
        Affichage.chargementTemplate("accueil", _app, {});
    }

    /**
     *  Controlleur de la page liste
     */
    function cbListe(){
        console.log("liste de bière");
        Biere.getListeBieres().then((listeBiere)=>{
            console.log(listeBiere); 
            
            Affichage.chargementTemplate("liste", _app, listeBiere);
            
        });
    }

    /**
     *  Controlleur de la page contact
     */
    function cbContact(){
        Affichage.chargementTemplate("contact", _app, {});
    }

    /**
     *  Controlleur médian (middleware) qui gère le "login", ici une case à cocher.
     */
    function cbLog(ctx, next){
        console.log(ctx, next);
        let log = document.querySelector("[name='log']");
        console.log(log);
        next();
        /*if(log.checked){
            next();
        }
        else{
            console.log("erreur");
        }*/
    }
})()
