/**
 * Module de gestion de l'affichage
 *
 * @Module Affichage
 * @requires Mustache.js {https://unpkg.com/mustache@latest}
 */
export default class Affichage {
    static chargement = {};
    /**
     * Méthode qui charge le fichier template et l'insert dans le dom_parent. La fonction met en cache les templates chargés
     * @param {String} nomTemplate 
     * @param {DOMElement} dom_parent 
     * @param {Object} data 
     * @memberof Affichage
     */
    static chargementTemplate(nomTemplate, dom_parent, data){
        // Si le template a déjà été chargé
        if(this.chargement[nomTemplate])
        {
            let vue = Mustache.render(this.chargement[nomTemplate], data);
            dom_parent.innerHTML = vue;
        }
        else{   // Premier appel au template
            fetch("./vues/"+nomTemplate + ".html")
                .then((reponse)=> reponse.text())
                .then((template)=>{
                    this.chargement[nomTemplate] = template;
                    let vue = Mustache.render(template, data);
                    dom_parent.innerHTML = vue;
                    //console.log(this.chargement);
                })
        }
        

    }

}