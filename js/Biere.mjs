/**
 * Module de gestion des données et des requêtes des bieres
 *
 * @module Biere
 */
export default class Biere {
    /**
     * URL de base du service Web utilisé pour les appels de l'API.
     * @static
     * @memberof Biere
     */
    static api_url = "http://127.0.0.1:8000/webservice/php/";

    
    
    /**
     * Récupérer l'ensemble des biere sur le service Web, trié
     *
     * @static
     * @param {object} tri
     * @param {string} tri.champ - Champ sur lequel s'applique le tri
     * @param {string} tri.ordre - ordre du tri (ASC ou DESC)
     * @returns Object
     * @memberof Biere
     */
    static async getListeBiereTrier (tri){
        const bieres = await this.getListeBieres();
        console.log(bieres);
        bieres.data.sort((a, b)=>{
            let res =0;
            if(a[tri.champ].toLowerCase() < b[tri.champ].toLowerCase()){    // Cas limite, la moyenne (à vérifier)
               res = -1;
            }
            else if(a[tri.champ].toLowerCase() > b[tri.champ].toLowerCase()){
                res = 1;
            }
            return res;
        });
        if(tri.ordre == "DESC"){
               bieres.data.reverse();
        }
        console.log(bieres.data[0]);
        console.log(bieres.data[bieres.data.length-1]);
        return bieres;
        
        /*this.getListeBieres().then((bieres)=>{
            //console.log(bieres.data);
            bieres.data.sort((a, b)=>{
                let res =0;
                if(a[tri.champ].toLowerCase() < b[tri.champ].toLowerCase()){    // Cas limite, la moyenne (à vérifier)
                   res = -1;
                }
                else if(a[tri.champ].toLowerCase() > b[tri.champ].toLowerCase()){
                    res = 1;
                }
                return res;
           });
           if(tri.ordre == "DESC"){
               bieres.data.reverse();
           }
           console.log(bieres.data[0]);
           console.log(bieres.data[bieres.data.length-1]);
           
           
       })*/
      
    }
    
    /**
     * Récupérer l'ensemble des biere sur le service Web, trié
     *
     * @static
     * @param {number} nombre - Nombre de résultat à retourner
     * @returns ?
     * @memberof Biere
     */
     static getListeMeilleuresBieres (nombre){
       
        
    }

    
    /**
     * Récupérer l'ensemble des biere sur le service Web
     *
     * @static
     * @returns Promise
     * @memberof Biere
     */
    static getListeBieres (){
        //const donnees;
        const entete = new Headers();
        entete.append("Content-Type", "application/json");

        const reqOptions = {
            method: "GET",
            headers: entete,
            redirect : "follow"
        };
         //https://developer.mozilla.org/fr/docs/Web/API/Fetch_API
        return fetch (this.api_url + "/biere", reqOptions)
            //.then(reponse=>reponse.json())
            .then((reponse)=>{
                return reponse.json();
            });            
        
    }

}
