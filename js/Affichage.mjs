/**
 * Module de gestion de l'affichage
 *
 * @Module Affichage
 * @requires Mustache.js {https://unpkg.com/mustache@latest}
 */
export default class Affichage {
    static chargement = {};

    static chargementTemplate(nomTemplate, dom_parent, data){
        if(this.chargement[nomTemplate])
        {
            let vue = Mustache.render(this.chargement[nomTemplate], data);
            dom_parent.innerHTML = vue;
        }
        else{
            fetch("./vues/"+nomTemplate + ".html")
                .then((reponse)=> reponse.text())
                .then((template)=>{
                    this.chargement[nomTemplate] = template;
                    let vue = Mustache.render(template, data);
                    dom_parent.innerHTML = vue;
                    console.log(this.chargement);
                })
        }
        

    }

}