"use strict";
//verification si une clé existe dans le localStorage
ul.innerHTML = (localStorage.getItem('list') != null)? 
localStorage.getItem('list') : "";

//affiche l'info si aucune tache est en cours
noTache.style.display = (ul.innerHTML == "")? "block" : "none";

//ajout de l'event del sur les span issus du storage
const spanDel = document.querySelectorAll(".delete");
for(let span of spanDel) span.onclick = () => del(span);

const spanUrg = document.querySelectorAll(".urgent");
for(let span of spanUrg) span.onclick = () => urgent(span);

form.onsubmit = () => {

    const li      = document.createElement("li");
    const spanOpt    = document.createElement("span");
    const spanUrg = document.createElement("span"); //creation d'une span
    const spanDel = document.createElement("span"); 

    spanOpt.classList.add("spanOpt")

    spanDel.classList.add("material-icons", "delete"); //ajout de la classe materiel-icons et delete
    spanDel.textContent = "delete_forever"; //ajout de l'icone poubelle

    spanUrg.classList.add("material-icons", "urgent"); //ajout de la classe materiel-icons et urgent
    spanUrg.textContent = "stars"; //ajout de l'icone stars

    li.textContent = champ.value; //li prend le contenu HTML de champ

    spanOpt.appendChild(spanUrg);
    spanOpt.appendChild(spanDel); //ajout de la span icone delete à li
    
    li.appendChild(spanOpt);
    ul.appendChild(li); //ajout du li à ul

    champ.value = ""; // efface le champ
    noTache.style.display = "none"; //enleve la div pas de tache en cours

    //ajout de l'event del et urgent sur les span créées
    spanDel.onclick = () => del(spanDel);
    spanUrg.onclick = () => urgent(spanUrg);

    //Sauvegarde du HTML dans le storage
    localStorage.setItem("list", ul.innerHTML);

    return false; //empeche l'actualisation de la page
    //e.preventDefault(); idem à return false
};

//fonction pour supprimer une tache
function del(el){
    el.parentElement.parentElement.remove(); //supprime le parent et les enfants
    localStorage.setItem("list", ul.innerHTML); //met à jour le storage
    noTache.style.display = (ul.innerHTML == "")? "block" : "none"; //met à jour la div tache en cours
}

function urgent(el)
{
    el.classList.toggle("gold");
    localStorage.setItem("list", ul.innerHTML); //save
}


/************Permettre le 100vh sur mobile */
let vh = window.innerHeight * 0.01;
const hauteur = window.innerHeight;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

//Empeche le resizing à l'apparition du clavier
const metas = document.getElementsByTagName('meta');
metas[1].content = 'width=device-width, height=' + window.innerHeight + ' initial-scale=1.0, maximum-scale=5.0,user-scalable=0';




