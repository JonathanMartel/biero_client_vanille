import Biere from './Biere.mjs';
import Affichage from './Affichage.mjs';
import page from "//unpkg.com/page/page.mjs";

// IIFE (Immediatly invoqued function expression)
(function(){
    let _app = document.querySelector(".app");

    let _route = [
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
        Affichage.chargementTemplate("nav", document.querySelector(".nav"), {});
        
        page({
            hashbang:true
        });   
    
       
        
        

    })


    function cbAccueil(){
        console.log("accueil");
        Affichage.chargementTemplate("accueil", _app, {});
    }

    function cbListe(){
        console.log("liste de bière");
        Biere.getListeBieres().then((listeBiere)=>{
            console.log(listeBiere); 
            
            Affichage.chargementTemplate("liste", _app, listeBiere);

        });
    }

    function cbContact(){
        Affichage.chargementTemplate("contact", _app, {});
    }

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
