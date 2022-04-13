import _App from './App.mjs';
import Tache from './Tache.mjs';
import Affichage from './Affichage.mjs';
import page from "//unpkg.com/page/page.mjs";

(function(){
    let App = {};
    const info = {usager : {}, taches:[]};

    const aRoutes = [
        {chemin : "/bieres", fichier:"tache.html", tmpl:"", cb: cbTaches},
        {chemin : "/", fichier:"", tmpl:"", cb: cbAccueil},
    ];


    // Toujours s'assurer que le DOM est prêt avant de manipuler le HTML.
    document.addEventListener("DOMContentLoaded", ()=>{

    })
})()
