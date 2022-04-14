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
        Biere.getListeBieres().then((listeBiere)=>{
            console.log(listeBiere); 
            let DOMListe = document.querySelector(".liste"); 
            let chaineDOM;
            chaineDOM = "<ul>";
            listeBiere.data.forEach(element => {
                chaineDOM += ("<li>" + element.nom +"</li>");
            });
            chaineDOM += "</ul>";
            DOMListe.innerHTML = chaineDOM;


        });
    })
    
    page({
        hashbang:true
    });   

    // Toujours s'assurer que le DOM est prêt avant de manipuler le HTML.
    document.addEventListener("DOMContentLoaded", ()=>{
        //console.log("Prêt");
        
        

    })
})()
