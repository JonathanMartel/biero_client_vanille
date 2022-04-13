import _App from './App.mjs';
import Tache from './Tache.mjs';
import Affichage from './Affichage.mjs';
import page from "//unpkg.com/page/page.mjs";

(function(){
    let App = {};
    const info = {usager : {}, taches:[]};

    const aRoutes = [
        {chemin : "/enregistrer", fichier:"enregistrer.html", tmpl:"", cb: cbEnregistrer},
        {chemin : "/tache", fichier:"tache.html", tmpl:"", cb: cbTaches},
        {chemin : "/ajouter", fichier:"ajouter.html", tmpl:"", cb: cbAjouter},
        {chemin : "/", fichier:"", tmpl:"", cb: cbAccueil},
        {chemin : "/connecter", fichier:"connecter.html", tmpl:"", cb: cbConnecter},
    ];

    let routeActive = {};
    /**
     * Reactivity update the data object
     * @param {Object} obj The data to update
     * Source : https://gomakethings.com/data-reactivity-with-vanilla-js/
     */
    var setData = function (obj, bRender=true) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if(JSON.stringify(info[key]) != JSON.stringify (obj[key])){
                    info[key] = obj[key];
                    console.log("data updated")
                }
                else{
                    bRender = false;
                    console.log("data not updated")
                }
                
            }
        }
        console.log(info);
        if(bRender) {
            Affichage.afficherTemplate(document.querySelector("#tmpl_nav").innerHTML, info, document.querySelector("#menu"))
            Affichage.afficherTemplate(routeActive.tmpl, info, document.querySelector("main"), info);
        }

    };

    /**
     * Retourne le template pour l'affichage avec Mustache
     * Trop spécifique pour être placé dans le module Affichage (deux dépenses)
     *
     * @param {Object} ctx
     * @returns {string}
     */
    function getTemplate (ctx){
        let template;
        aRoutes.forEach(uneRoute => {            
            if(uneRoute.chemin == ctx.path){
                template = uneRoute.tmpl;
                routeActive = uneRoute;
            }
        });

        return template;
    }
    
    function cbAccueil(ctx) {
        setData({message : ""}, false);
        if(info.usager.token){
            page("/tache");
        }
        else {
            page("/connecter");
        }
        
    };

    function cbEnregistrer(ctx) {
        let template = getTemplate(ctx);
        setData({message : ""}, false);
        if(template){
            Affichage.afficherTemplate(template, info, document.querySelector("main"));   // tmpl, data, noeud
        }
        
        console.log("enregistrer ...")
    };
    function cbConnecter(ctx) {
        let template = getTemplate(ctx);
        console.log(template);
        setData({message : ""}, false);
        if(template){
            Affichage.afficherTemplate(template, info, document.querySelector("main"));   // tmpl, data, noeud
        }
        
        console.log("enregistrer ...")
        
    };

    function cbTaches(ctx) {
        setData({message : ""}, false);
        if(!info.usager.token){
            page("/connecter");
        }
        else {
            let template = getTemplate(ctx);
            Tache.getListeTache(info.usager.token)
                    .then(donnees => {
                        console.log(donnees)
                        setData({taches: donnees.data}, true);
                        //info.taches = donnees.data;
                        console.log(info.taches)
    
                        if(template){
                            Affichage.afficherTemplate(template, info, document.querySelector("main"));   // tmpl, data, noeud
                        }
                    });
        }
       
    };

    function cbAjouter(ctx) {
        if(!info.usager.token){
            page("/connecter");
        }
        else {
            let template = getTemplate(ctx);
            if(template){
                Affichage.afficherTemplate(template, info, document.querySelector("main"));   // tmpl, data, noeud
            }
        }
    };

    // Toujours s'assurer que le DOM est prêt avant de manipuler le HTML.
    document.addEventListener("DOMContentLoaded", ()=>{
        //Chargement asynchrone des fichiers de gabarit pour Mustache
        Affichage.chargementTemplate(aRoutes)
            .then(() => {
                // prêt à afficher/créer mes routes.
                aRoutes.forEach(uneRoute =>{
                    page(uneRoute.chemin, uneRoute.cb); // Configuration de l'ensemble des routes.
                })
                // Mettre à jour la navigation
                Affichage.afficherTemplate(document.querySelector("#tmpl_nav").innerHTML, info, document.querySelector("#menu"));
                
                //Démarrage du router
                page({
                    hashbang : true
                });
                
            });

        //Gestionnaire d'événement principale sur l'ancêtre commun le plus proche de tous les boutons/élément avec click
        document.querySelector("main").addEventListener("click", function(evt){
            console.log(evt.target)

            if(evt.target.classList.contains("actionEnregistrer")){
                let usager = {
                    name: document.querySelector("[name='name']").value,
                    email : document.querySelector("[name='email']").value,
                    password : document.querySelector("[name='password']").value,
                    age : document.querySelector("[name='age']").value
                }

                if(usager.name && usager.email && usager.password && usager.age){
                    Tache.setUsager(usager)
                    .then(infoLogin =>{
                        console.log(infoLogin)
                        setData({usager : infoLogin});
                        setData({taches : []});
                        
                        if(infoLogin.token){
                            setData({message : "L'usager a été créé"}, true);  
                            Tache.getListeTache(info.usager.token).then(res => { 
                                setData({taches: res.data}, routeActive.nom == "tache" );
                                page("/tache");
                            });
                        }else{
                            setData({message : "Erreur de création de l'usager"}, true);  
                            
                        }
                        console.log(info.usager);
                    });
                }
                else{
                    setData({message : "Les champs doivent être remplis"}, true);
                }
                
            }

            if(evt.target.classList.contains("actionEffacerUsager")){
                if(info.usager.token){
                    Tache.delUsager(info.usager.token);
                    setData({usager: {}}, true);
                }
                
            }

            if(evt.target.classList.contains("actionConnecter")){
                
                let usager = {
                    email : document.querySelector("[name='email']").value,
                    password : document.querySelector("[name='password']").value,
                }
                if(usager.email && usager.password){
                    Tache.logUsager(usager)
                    .then(infoLogin =>{
                        if(infoLogin.token){
                            setData({usager : infoLogin});
                            setData({taches : []});  
                            setData({message : "Usager connecté"}, true);

                            Tache.getListeTache(info.usager.token).then(res => { 
                                setData({taches: res.data}, routeActive.nom == "tache" );
                                page("/tache");
                            })
                        }else{
                            setData({message : "Erreur de connnection"}, true);
                            
                        }
                        console.log(info.usager)
                    });
                }
                else {
                    setData({usager : {}});
                    setData({taches : []}); 
                    setData({message : "Les champs doivent être remplis"}, true);
                }
                
            }
            if(evt.target.classList.contains("actionDeconnecter")){
                Tache.delogUsager(info.usager.token)
                    .then((data)=>{
                        //console.log(data);
                        setData({usager: {}}, true);
                    })
                
            }

           

            if(evt.target.classList.contains("actionAjouter")){
                let tache = {
                    description : document.querySelector("[name='description']").value
                }
                if(info.usager.token && tache.description){
                    Tache.setTache(tache, info.usager.token)
                        .then(()=>{
                            //document.querySelector("[name='description']").value = "";
                            setData({message : "Tâche ajoutée"}, true);
                        });
                }   
            }

            if(evt.target.classList.contains("uneTache")){
                let uneTache = evt.target;
                let statut = uneTache.classList.contains("complete");
                let data = {
                    id :uneTache.dataset.id,
                    completed : !statut
                }
                console.log(data);
                Tache.updateTache(data, info.usager.token)
                    .then((res)=>{
                        Tache.getListeTache(info.usager.token).then(res => { 
                            console.log(res);
                            setData({taches: res.data}, true);
                            setData({message : "Tâche mise à jour"}, true);
                           //page("/tache");
                        });
                    })
            }

            if(evt.target.classList.contains("btnEffacerTache")){
                let uneTache = evt.target.parentElement;
                
                let {id} = uneTache.dataset;
                
                
                Tache.effacerTache(id, info.usager.token)
                    .then((res)=>{
                        Tache.getListeTache(info.usager.token).then(res => { 
                            console.log(res);
                            setData({taches: res.data}, true);
                            setData({message : "Tâche effacée"}, true);
                        });
                    })
            }

        })

    })
})()
