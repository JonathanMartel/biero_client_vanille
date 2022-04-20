/*
 Fichier principal, il contient la logique de l'application.

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
        if(log.checked){
            next();
        }
        else{
            console.log("erreur");
        }
    }
})()
