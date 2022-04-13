import Biere from './Biere.mjs';
import Affichage from './Affichage.mjs';
import page from "//unpkg.com/page/page.mjs";

// IIFE (Immediatly invoqued function expression)
(function(){
    
    // Toujours s'assurer que le DOM est prêt avant de manipuler le HTML.
    document.addEventListener("DOMContentLoaded", ()=>{
        //console.log("Prêt");
        Biere.getListeBieres();

    })
})()
