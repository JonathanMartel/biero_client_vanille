import Biere from './Biere.mjs';
import Affichage from './Affichage.mjs';
import page from "//unpkg.com/page/page.mjs";

// IIFE (Immediatly invoqued function expression)
(function(){
    
    page("/", ()=>{
        console.log("accueil");
    })
    page("/liste", ()=>{
        console.log("liste de bière");
    })
    
    page({
        hashbang:true
    });   

    // Toujours s'assurer que le DOM est prêt avant de manipuler le HTML.
    document.addEventListener("DOMContentLoaded", ()=>{
        //console.log("Prêt");
        Biere.getListeBieres().then((listeBiere)=>{
            console.log(listeBiere);  
            // Traitement de mes données...

        });
        

    })
})()
